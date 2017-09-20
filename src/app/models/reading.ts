import {Sensor} from './sensor'
export class Reading
{
    id?:string;
    name: string;
    description: string;
    value: number;
    unit: string;
    sensorid: string;
}