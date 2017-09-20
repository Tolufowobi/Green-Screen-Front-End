import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {TextBoxField} from '../../models/form.models/textboxfield';
import {BaseField} from '../../models/form.models/basefield';

@Component({
  moduleId: module.id,
  selector: 'app-dynamicformfield',
  templateUrl: './dynamicformfield.component.html',
  styleUrls: ['./dynamicformfield.component.css']
})
export class DynamicFormFieldComponent implements OnInit {

  constructor() { }
  @Input() field: BaseField<any>;
  @Input() form: FormGroup;

  get isValid(){
    return this.form.controls[this.field.key];
  }

  ngOnInit() {
    console.log("Initializing form field component...")
  }

}
