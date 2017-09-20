import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import {ServiceResources} from './serviceresources';
import {AppGlobals} from '../appglobals';

import * as io from 'socket.io-client';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Reading} from '../models/reading';
import {Sensor} from '../models/sensor';
import {Value} from '../models/value';

@Injectable()
export class SocketService {

  url:string;
  private socket :SocketIOClient.Socket;

  readingTransmission: BehaviorSubject<Reading> = new BehaviorSubject<Reading>(null);
  valueTransmission: BehaviorSubject<Value> = new BehaviorSubject<Value>(null);
  
  public lastConnector: string;

  constructor(private globals: AppGlobals, private urlresources: ServiceResources) {
    this.urlresources.serverUrl.subscribe(value => this.url = value.replace('/client', ''));
    this.socket = io(this.url);
    var self = this
    this.socket.on('NewValue', function(data){
      console.log('Value received');
      var obj = JSON.parse(data)
      var value = new Value;
      value.id = obj._id;
      value.readingid = obj.reading_id;
      value.value = obj.value;
      value.timestamp = obj.time_stamp;
      self.announceNewValue(value);
    });
    this.socket.on('ReadingTransmitted', function(data){
      console.log('Reading Transmission Recieved');
      var obj = JSON.parse(data);
      var reading = new Reading;
      reading.id = obj._id;
      reading.value = obj.value;
      self.announceChangedReading(reading);
    });
  }

 //Inbound Data Announcements
  announceChangedReading(reading:Reading){
    this.readingTransmission.next(reading);
  }

  announceNewValue(value:any){
    this.valueTransmission.next(value);
  }

  //Outbound data transmissions events
  changeSensorState(sensor: Sensor){
    console.log("Changing sensor state...")
    this.socket.emit('SensorPowerToggled',{'id':sensor.id, 'state':sensor.isOn});
  }

  changeReadingValue(reading: Reading){
    console.log('Changing reading value');
    this.lastConnector = this.lastConnector;
    //this.socket.connect();
    this.socket.emit('ReadingChanged', {'id':reading.id, 'value': reading.value});
  }


}
