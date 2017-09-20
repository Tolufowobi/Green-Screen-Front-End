import {BaseField} from './basefield';

export class DropDownField extends BaseField<string>{
    controlType ='dropdown';

    options: {key: string, value:  string}[] =[] ;

    constructor(options: {} ={}){
        super(options);
        this.options = options['options'] || [];
    }
}