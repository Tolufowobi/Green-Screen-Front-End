import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseField} from '../../models/form.models/basefield';
import {TextBoxField} from '../../models/form.models/textboxfield';
import {FormRendererService} from '../../services/formrenderer.service';
import {DynamicFormFieldComponent} from '../dynamicformfield/dynamicformfield.component'
@Component({
  moduleId: module.id,
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.css'],
  providers: [FormRendererService]
})
export class DynamicformComponent implements OnInit {

  @Input() fields: BaseField<any>[];
  @Output() formSubmitted = new EventEmitter<any>();

  form: FormGroup;
  payLoad = '';

  constructor(private renderService: FormRendererService) {
  }

  ngOnInit() {
    this.form = this.renderService.toForm(this.fields);
    console.log(this.fields.toString());
  }

  onSubmit(){
    this.payLoad =JSON.stringify(this.form.value);
    this.formSubmitted.emit(this.payLoad);
  }

}
