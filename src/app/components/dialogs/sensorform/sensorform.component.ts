import { Component, OnInit, Input } from '@angular/core';
import {BaseField} from '../../../models/form.models/BaseField';
import {TextBoxField} from '../../../models/form.models/textboxfield';
import {Sensor} from '../../../models/sensor';
import {GreenHouse} from '../../../models/greenhouse';
import {SensorsService} from '../../../services/sensors.service';
import {FormRendererService} from '../../../services/formrenderer.service';
import {AppGlobals} from '../../../appglobals';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DynamicformComponent} from '../../dynamicform/dynamicform.component';

@Component({
  moduleId:module.id,
  selector: 'app-sensorform',
  templateUrl: './sensorform.component.html',
  styleUrls: ['./sensorform.component.css'],
 providers: [SensorsService, FormRendererService]
})
export class SensorformComponent implements OnInit {

  //Form Fields
  formFields: BaseField<any>[];
  greenhouse : GreenHouse;

  constructor( private sensorsservice: SensorsService, private formrenderservice: FormRendererService, private globals: AppGlobals, private activeModal: NgbActiveModal) { 
    this.formFields = this.renderFormFields();
    this.globals.currentGreenHouse.subscribe(shelter => this.greenhouse = shelter);
  }

  ngOnInit() {
  }

 renderFormFields() : BaseField<any>[]
  {
    let fields: BaseField<any>[] = new Array<BaseField<any>>();
    var nameField = this.formrenderservice.renderTextBoxField('name', 'Device Name',true, 1,"","text");
    var descField = this.formrenderservice.renderTextBoxField('desc', 'Description', true, 2,"","text");
    var manuField = this.formrenderservice.renderTextBoxField('manu', 'Manufacturer', false, 3,"","text");
    var modelField = this.formrenderservice.renderTextBoxField('model', 'Device Model', false, 4,"","text");
    var serialNumber = this.formrenderservice.renderTextBoxField('serial', 'Serial Number', false, 5,"","text");
    fields.push(nameField, descField, manuField, modelField, serialNumber);
    return fields.sort((a,b) =>a.order - b.order);
  }

  add(formdata:any){
    var data = JSON.parse(formdata);
    var sensor = new Sensor;
    sensor.name = data.name;
    sensor.description = data.desc;
    sensor.manufacturer = data.manu;
    sensor.model = data.model;
    sensor.serialNo = data.serial
    sensor.shelterid = this.greenhouse.id;
    sensor.isOn = false;
    this.sensorsservice.add(sensor).subscribe(res =>
    {
      if(res){
        console.log("Sensor succesfully added");
         
      }
    });
  }
}
