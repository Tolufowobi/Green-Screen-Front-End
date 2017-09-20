import { Component, OnInit } from '@angular/core';

import {SensorsService} from '../../../services/sensors.service';
import {ReadingsService} from '../../../services/readings.service';
import {Sensor} from '../../../models/sensor';
import {GreenHouse} from '../../../models/greenhouse';
import {Reading} from '../../../models/reading';
import {MdDialog} from '@angular/material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {AppGlobals} from '../../../appglobals';
import {ReadingformComponent} from '../../dialogs/readingform/readingform.component'
import {fadeInAnimation} from '../../../animations/navigation';
import {staggerAnimation} from '../../../animations/pages';
import {MdSnackBar} from '@angular/material';
import {SocketService} from '../../../services/socket.service';
@Component({
  moduleId: module.id,
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  providers: [ReadingsService,SensorsService, MdDialog, SocketService],
  animations: [fadeInAnimation, staggerAnimation]
})
export class SensorComponent implements OnInit {

  private shelter:GreenHouse;
  private sensor: Sensor;
  public readings: Reading[];

  state:String;

  constructor(private globals:AppGlobals, private sensorsservice:SensorsService, private readingsservice: ReadingsService, private router:Router, private modalService: NgbModal, private socketservice : SocketService) {
    this.sensor = null;
    this.readings = new Array<Reading>();
    this.socketservice.lastConnector = "Sensor Component"
  }

  ngOnInit() {
    var self = this
    this.globals.currentGreenHouse.subscribe(shelter => this.shelter = shelter);
    this.globals.currentSensor.subscribe(sensor => {
      if(sensor){
        this.sensor = sensor;
        if(this.sensor.isOn === true){
          self.state = 'On'
        }else{
          self.state = "Off"
        }
      }
    });
    this.readingsservice.getSensorReadings(this.sensor).subscribe(readings =>{
      this.readings = readings;
    });
    this.globals.addedReading.subscribe(reading => { 
      if(reading != null){
      this.readings.push(reading);
      }
    });
    this.globals.deletedReading.subscribe(reading => {
      var index = this.readings.indexOf(reading);
      this.readings.splice(index, 1);
    });
    this.globals.updatedReading.subscribe(reading => {
      var r = this.readings.find(m => m.id == reading.id);
      r = reading;
    })
  }

  addReading(){
   this.modalService.open(ReadingformComponent, {size:"sm"}) ;
  }

  deleteReading(reading:Reading)
  {
    if(reading)
      {
        this.readingsservice.delete(reading).subscribe(isSuccessful =>{
          if(isSuccessful){
            //this.snackBar.open("Reading deleted.", "Ok", {duration:2000});
          }
        });
      }
  }

  update(sensor:Sensor)
  {
    if(sensor)
      {
        this.sensorsservice.update(sensor).subscribe(res =>{
          //this.snackBar.open("Sensor details updated", "Ok", {duration: 2000})
        });
      }
  }

  toggleSensor(){
    if(this.sensor.isOn == true){
      this.sensor.isOn = false;
      this.state = "Off";
    }else{
      this.sensor.isOn = true;
      this.state = "On";
    }
    this.socketservice.changeSensorState(this.sensor);
  }

}
