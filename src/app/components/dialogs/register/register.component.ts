import { Component, OnInit } from '@angular/core';
import {MdDialogRef, MdDialogConfig, DialogPosition} from '@angular/material';
import {User} from '../../../models/user';
import {Router} from '@angular/router';
import {AppGlobals} from '../../../appglobals';

import {BaseField} from '../../../models/form.models/basefield';
import {TextBoxField} from '../../../models/form.models/textboxfield';

import {AuthService} from '../../../services/authservice.service';
import {FormRendererService} from '../../../services/formrenderer.service';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FormRendererService]
})
export class RegisterComponent implements OnInit {


  //Form Fields
  formFields: BaseField<any>[];


  constructor(public dialogRef:MdDialogRef<RegisterComponent>, private router:Router, private authservice:AuthService, private formrenderservice: FormRendererService, private globals: AppGlobals) {
    this.formFields = this.renderFormFields();
   }

  ngOnInit() {
    console.log('Initializing register componenet')
  }

  renderFormFields() : BaseField<any>[]
  {
    let fields: BaseField<any>[] = new Array<BaseField<any>>();
    var fname = this.formrenderservice.renderTextBoxField('firstname', "First Name", true, 1);
    var lname = this.formrenderservice.renderTextBoxField('lastname', "Last Name", true, 2);
    var email = this.formrenderservice.renderTextBoxField('email', 'Please supply an email address (This will be your username)', true, 3);
    var phone = this.formrenderservice.renderTextBoxField('phone', 'Contact Phone Number', false, 4);
    var pwd = this.formrenderservice.renderTextBoxField('password', "Please enter a password for the account", true,5,null,'password');
    var _pwd = this.formrenderservice.renderTextBoxField('_password',"Confirm your password",true, 6,null,'password');
    fields.push(fname, lname, email, phone, pwd, _pwd);
    return fields.sort((a,b) => a.order - b.order);
  }

  register(formdata: any){
    //compare passwords
    var data= formdata;
    if( data.password == data._password){
      let user = new User();
    let self = this;
    user.first_name = data.firstname;
    user.last_name = data.lastname;
    user.username = data.email;
    user.phone = data.phone;
    user.password = data.password
    this.authservice.registerUser(user).subscribe(res =>{
      if(res){
        this.authservice.authenticateUser(user.username, user.password).subscribe(res => {
          if(res){
            self.router.navigate(['dashboard']);
          }
        }
        );
      }
    });
    } 
  }




}
