import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {BaseField} from '../models/form.models/basefield';
import {TextBoxField} from '../models/form.models/textboxfield';
import {DropDownField} from '../models/form.models/dropdownfield';

@Injectable()
export class FormRendererService{
    cosntructor(){}

    toForm(fields: BaseField<any>[]){
        let controls: any = {};
        console.log("Renderig form")
        fields.forEach(field =>{
            controls[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
            : new FormControl(field.value || '');
        });
        return new FormGroup(controls);
    }

    renderTextBoxField(key: string, label: string, required: boolean, order: number, value?: string, inputType?: string) : TextBoxField{
        let tbxField: TextBoxField = new TextBoxField({
            key: key,
            label: label,
            required: required,
            value: value || '',
            order: order,
        });
        if(inputType){
            tbxField.type = inputType;
        }
        return tbxField;
    }

     renderDropDownField(key:string, label: string, required: boolean, options: string[], order: number):  DropDownField{
        let drpdwnField: DropDownField = new DropDownField({
            key: key,
            label: label,
            required: required,
            options: options
        });
        return drpdwnField;
    }
}