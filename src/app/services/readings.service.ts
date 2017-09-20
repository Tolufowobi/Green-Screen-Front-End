import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import {ServiceResources} from './serviceresources';
import {AppGlobals} from '../appglobals';

import * as io from 'socket.io-client';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Value} from '../models/value';
import {Reading} from '../models/reading';
import {Sensor} from '../models/sensor';

@Injectable()
export class ReadingsService {

  url:string;
  private socket :any;
  
  constructor(private http:Http, private globals:AppGlobals,private urlresources:ServiceResources) { 
    this.urlresources.serverUrl.subscribe(value => this.url = value+'/readings');
    /* this.socket = io(this.url);
    this.socket.on('valuechanged', function(reading)
    {
      this.changedReading.next(reading);
    }); */
    this.socket = io(this.url);
    var self = this;
    this.socket.on('changedValue', function(data){
      var reading = new Reading;
      reading.id = data.id;
      reading.value = data.value;
      self.globals.announceChangedReading(reading);
    })
  }

  add(reading:Reading): Observable<boolean>{
    if(reading)
      {
        var self = this;
        var headers = new Headers;
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url+'/add', reading, {headers:headers}).map(res => 
        {   
            if(res){
              reading.id = res['_id'];
              //inform globals
              self.globals.readingAdded(reading);
              return true;
              }else{
                return false;
              }
        });
      }
      else{
        throw new Error('bad data');
      }
  }

  delete(reading:Reading):Observable<boolean> 
  {
    if (reading)
    {
      var self = this;
      return this.http.delete(this.url+'/delete/'+reading.id).map(res => 
      {
        if(res.json() =='true'){
          self.globals.readingAdded(reading);
          return true;
        }else{
          return false;
        }
      });
    }
    else{
      throw new Error('bad data');
    }
  }

  edit(reading:Reading): Observable<boolean>
  {
    if (reading)
    { var self = this;
      var headers= new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.url+'/update', reading, {headers:headers}).map((res) => 
      {
      self.globals.readingUpdated(reading);
      return true;
      })
    }else{
      return new Observable<boolean>();
    }
  }

  /* changeSetting(reading): Observable<Reading>
  {
    if(reading)
      {
        this.socket.emit('settingchanged',reading);
       return new Observable<Reading>(reading) ;
      }
  } */

  public getSensorReadings(sensor:Sensor): Observable<Reading[]> {
    if (sensor){
     return this.http.get(this.url+'/sensorreadings/'+sensor.id).map(res =>
      {
        var result = res.json();
        let readings = new Array<Reading>();
        result["Readings"].forEach(element => {
          var reading = new Reading();
          reading.id = element._id;
          reading.name = element.name;
          reading.description = element.description;
          reading.value = element.value;
          reading.unit = element.unit;
          reading.sensorid = element.sensor_id;
          readings.push(reading);
        });
        return readings;
      });
    }
    else return null;
  }

  getReadingValues(reading:Reading): Observable<Value[]>
  {
    return this.http.get(this.url+'/readingvalues/'+reading.id).map(res=>{
      var result = res.json();
      console.log("values received");
        let values = new Array<Value>();
        result["Values"].forEach(element => {
          var value = new Value();
          value.id = element._id;
          value.readingid = element.reading_id;
          value.value = element.value;
          value.timestamp = element.time_stamp;
          values.push(value);
        });
        return values;
    })
  }

  public changeReading(reading: Reading){
    this.socket.emit('ReadingChanged', {id: reading.id, value:reading.value});
  }

  
}
