import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import {ServiceResources} from './serviceresources';
import {AppGlobals} from '../appglobals';
import {GreenHouse} from '../models/greenhouse';
import {Sensor} from '../models/sensor';

@Injectable()
export class SensorsService {

  shelter: GreenHouse;

  url:string ;
  errMsg: string = 'bad data';
  constructor(private http:Http, private globals:AppGlobals, private urlresources:ServiceResources) { 
    this.urlresources.serverUrl.subscribe(value => this.url = value+'/sensors');
  }

  add(sensor:Sensor): Observable<boolean>
  {
    if(sensor){
      var self = this;
      var headers = new Headers()
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.url+'/add', sensor,{headers:headers}).map(res => {
      var _newSensor = res.json();
      if(_newSensor){
        sensor.id= _newSensor._id;
        sensor.description = _newSensor.description;
        sensor.manufacturer = _newSensor.manufacturer;
        sensor.model = _newSensor.model;
        sensor.serialNo = _newSensor.serialNo;
        sensor.isOn = _newSensor.isOn;
        self.globals.sensorAdded(sensor);
        return true;
      }else{
        return false;
      }
      });
    }
  }

  delete(sensor:Sensor): Observable<Boolean>
  {
    if(this.validate(sensor) && sensor.id != '')
    { var self = this
      return this.http.delete(this.url+'/delete/'+sensor.id).map(res => {
        if (res.status == 200){
          self.globals.sensorDeleted(sensor);
          return true;
        }else{
          return false;
        }
      });
    }
    else
    {
      throw new Error(this.errMsg)
    }
  }

  update(sensor:Sensor): Observable<boolean>
  {
    if (this.validate(sensor))
      {  var self = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/X-form=urlencoded');
        return this.http.put(this.url+'/update', sensor, {headers:headers}).map(res => 
        {
          if(res.status != 400){
            self.globals.sensorUpdated(sensor);
            return true;
          }else{
            return false;
          }
        });
      }
      else{
        throw Error(this.errMsg);
      }
  }

  getGreenHouseSensors(shelter:GreenHouse): Observable<Sensor[]>
  {
    if(shelter){
       return this.http.get(this.url+'/sheltersensors/'+shelter.id).map((res) =>{ 
        var sensors = new Array<Sensor>();
        var result = res.json();
        result["Sensors"].forEach(element => {
          let sensor = new Sensor();
          sensor.id = element._id;
          sensor.name = element.name;
          sensor.description = element.description;
          sensor.manufacturer = element.manufacturer;
          sensor.model = element.model;
          sensor.serialNo = element.serialNo;
          sensor.shelterid = element.shelter_id;
          sensors.push(sensor);
        });
         return sensors
        });
    }
      else{
        throw new Error('bad data');
      }
  }

  private validate(sensor:Sensor):boolean
  { 
    if(sensor)
      {
        return true;
      }
    else{
      return false;
    }
  }
}
