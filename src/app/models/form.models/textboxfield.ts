import {BaseField  } from './basefield';

export class TextBoxField extends BaseField<string>{
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}