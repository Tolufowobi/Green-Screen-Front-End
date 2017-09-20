import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BaseField} from '../../../models/form.models/BaseField';
import {TextBoxField} from '../../../models/form.models/textboxfield';
import {GreenHouse} from '../../../models/greenhouse';
import {User} from '../../../models/user';
import {GreenhousesService} from '../../../services/greenhouses.service';
import {FormRendererService} from '../../../services/formrenderer.service';
import {AppGlobals} from '../../../appglobals';
import {fadeIn3D} from '../../../animations/navigation';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DynamicformComponent} from '../../dynamicform/dynamicform.component';

@Component({
  moduleId: module.id,
  selector: 'app-greenhouseform',
  templateUrl: './greenhouseform.component.html',
  styleUrls: ['./greenhouseform.component.css'],
  providers: [GreenhousesService, FormRendererService],
  animations:[fadeIn3D]
})
export class GreenhouseformComponent implements OnInit {

  //Form Fields
  formFields: BaseField<any>[];
  user: User;

  constructor( private greenshouseservice:GreenhousesService, private formrenderservice: FormRendererService, private globals: AppGlobals, private activeModal : NgbActiveModal) 
  { 
    this.formFields = this.renderFormFields();
    this.globals.appUser.subscribe(usr => this.user = usr);
    console.log("teedot.")
  }

  ngOnInit() {
  }

  renderFormFields() :BaseField<any>[]
  {
    let fields: BaseField<any>[] = new Array<BaseField<any>>();
    var nameField = this.formrenderservice.renderTextBoxField('facility', 'Facilty Name',true, 1,"","text");
    var descField = this.formrenderservice.renderTextBoxField('desc', 'Description', true, 2,"","text");
    var streetField = this.formrenderservice.renderTextBoxField('street', 'Street', true, 3,"","text");
    var cityField = this.formrenderservice.renderTextBoxField('city', 'City', true, 4,"","text");
    // *******change to dropdown field and consume  geographical service API *****
    var stateField = this.formrenderservice.renderTextBoxField('state', 'Province/ State', true, 5,"","text");
    var countryField = this.formrenderservice.renderTextBoxField('country', 'Country', true, 6,"","text");
    fields.push(nameField, descField, streetField, cityField, stateField, countryField);
    return fields.sort((a,b) =>a.order - b.order);
  } 

  add(formdata:any){
    var data = JSON.parse(formdata);
    var greenhouse = new GreenHouse();
    greenhouse.name = data.name;
    greenhouse.description = data.desc;
    var location = data.street + ' ' + data.city + ' ' + data.state + ' ' + data.country;
    greenhouse.location = location;
    greenhouse.userid = this.user.id;
    this.greenshouseservice.add(greenhouse).subscribe(res => {
      if(res){
        this.activeModal.close();
      }
    });
  }


}
