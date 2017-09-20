import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authservice.service';
import {Router} from '@angular/router';
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
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   providers: [FormRendererService, AuthService]
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  formFields:BaseField<any>[];

  constructor(private authservice:AuthService, private router: Router, private globals:AppGlobals, private formrenderservice: FormRendererService, private activeModal: NgbActiveModal) {
    this.formFields = this.renderFormFields()
   }

  ngOnInit() {
    console.log('Initializing login componenet');
  }

  login(formdata:any){
    var data = JSON.parse(formdata);
    this.username = data.username;
    this.password = data.password
    this.authservice.authenticateUser(this.username, this.password).subscribe(response =>{
      if(response){
        this.router.navigate(["dashboard"]);
        this.activeModal.close();
      }
    }); 
  }

  renderFormFields() : BaseField<any>[]
  {
    let fields: BaseField<any>[] = new Array<BaseField<any>>();
    var username = this.formrenderservice.renderTextBoxField('username', 'User Name',true, 1,"","text");
    var password = this.formrenderservice.renderTextBoxField('password', 'Password', true, 2,"","password");
    fields.push(username, password);
    return fields.sort((a,b) =>a.order - b.order);
  }

}
