import { Component, OnInit } from '@angular/core';

import {ReadingsService} from '../../../services/readings.service';
import {FormRendererService} from '../../../services/formrenderer.service';
import {Chart} from 'angular-highcharts';
import {AppGlobals} from '../../../appglobals'
import {Reading} from '../../../models/reading';
import {Sensor} from '../../../models/sensor';
import {DataFilterPipe} from '../../../datafilterpipe';
import {BaseField} from '../../../models/form.models/basefield';
import {TextBoxField} from '../../../models/form.models/textboxfield';
import {Value} from '../../../models/value';
import {fadeInAnimation} from '../../../animations/navigation';
import {SocketService} from '../../../services/socket.service';
@Component({
  moduleId: module.id,
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css'],
  providers: [ReadingsService,FormRendererService, SocketService],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]':''}
})
export class ReadingComponent implements OnInit {

  reading: Reading;
  currentSensor: Sensor;
  chart: Chart;
  //Form Fields
  formFields: BaseField<any>[];
  values: Value[];
  dataPoints: Array<any>

  public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "timestamp";
    public sortOrder = "asc";

  constructor(private readingsservice:ReadingsService, private globals:AppGlobals, private formrenderservice: FormRendererService, private sockectService: SocketService)
  {
    console.log('initializing reading coomponent');
    this.values = new Array<Value>();
    this.dataPoints = new Array<any[]>();
    this.globals.currentSensor.subscribe(sensor => this.currentSensor = sensor);
    this.globals.currentReading.subscribe(reading => {
      this.reading = reading;
      this.readingsservice.getReadingValues(this.reading).subscribe(values => {
      if (values){
        this.values = values;
        this.values.forEach(val => {
         this.dataPoints.push(this.renderDataPoint(val));
        });
      }
      this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
         text: 'Readings visual'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time Line'
        } 
      },
      yAxis:{
        title: {
          text: 'Values (' + this.reading.unit + ')',
        }, 
        min: 0
      },
      series: [{
        name: this.reading.name,
        data: this.dataPoints
      }] 
    });
    });
    
    });
    
    this.sockectService.readingTransmission.subscribe(read =>{
      if(read && read.id == this.reading.id){
        this.reading.value = read.value;
      }
    });
    this.sockectService.valueTransmission.subscribe(value =>{
      if(value && value.readingid == this.reading.id){
        this.values.push(value);
        this.dataPoints.push(this.renderDataPoint(value));
        this.chart.addPoint([Date.parse(value.timestamp), value.value],0,true, true);
      }
    })
    
   }

  ngOnInit() {

  }

  add(formdata:any)
  {
    var data = formdata;
    var reading = new Reading();
    reading.name = data.name;
    reading.unit = data.unit;
    reading.description = data.desc;
    reading.sensorid = this.currentSensor.id;
    this.readingsservice.add(reading).subscribe(response =>{
      if(response){

      }
    });
  }

  delete(reading:Reading)
  {
    if(reading){
      this.readingsservice.delete(reading).subscribe(readg => this.globals.setCurrentReading(null));
    }
  }

  private renderDataPoint(value: Value):Array<any>{
      var datapoint = [Date.parse(value.timestamp), value.value]
      return datapoint
  }
  
}
