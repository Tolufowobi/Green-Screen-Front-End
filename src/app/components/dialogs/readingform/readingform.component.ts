import { Component, OnInit, Input } from '@angular/core';
import {FormRendererService} from '../../../services/formrenderer.service';
import {AppGlobals} from '../../../appglobals';
import {Reading} from '../../../models/reading';
import {Sensor} from '../../../models/sensor';
import {ReadingsService} from '../../../services/readings.service';
import {BaseField} from '../../../models/form.models/basefield';
import {TextBoxField} from '../../../models/form.models/textboxfield';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId:module.id,
  selector: 'app-readingform',
  templateUrl: './readingform.component.html',
  styleUrls: ['./readingform.component.css'], 
  providers: [ReadingsService, FormRendererService]
})
export class ReadingformComponent implements OnInit {
  sensor : Sensor;
  reading: Reading;

  //Form Fields
  formFields : BaseField<any>[];

  constructor(private formrenderservice: FormRendererService, private readingservice: ReadingsService, private globals: AppGlobals, private activeModal: NgbActiveModal) {
    this.formFields = this.renderFormFields();
    this.globals.currentSensor.subscribe(sensor => this.sensor = sensor);
   }

  ngOnInit() {
  }

  renderFormFields(){
    let fields: BaseField<any>[] = new Array<BaseField<any>>();
    var nameField = this.formrenderservice.renderTextBoxField('name', 'Measurement', true, 1,"","text");
    var descField = this.formrenderservice.renderTextBoxField('desc', "Description",true, 2,"","text");
    var unitField = this.formrenderservice.renderTextBoxField('unit', 'Assigned Unit', true, 3,"","text");
    fields.push(nameField, descField, unitField);
    return fields.sort((a,b)=> a.order - b.order);
  }

  add(formdata: any){
    var data = JSON.parse(formdata);
    var reading = new Reading();
    reading.name = data.name;
    reading.unit = data.unit;
    reading.value = 0;
    reading.description = data.desc;
    reading.sensorid = this.sensor.id;

    this.readingservice.add(reading).subscribe(res =>
    {
      if (res){
        this.activeModal.close(); 
      }
    });
  }

}
