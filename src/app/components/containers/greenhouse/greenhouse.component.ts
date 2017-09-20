import { Component, OnInit } from '@angular/core';
import {SensorComponent} from '../sensor/sensor.component';
import {SensorformComponent} from '../../dialogs/sensorform/sensorform.component';
import {MdDialog} from '@angular/material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Sensor} from '../../../models/sensor';
import {GreenHouse} from '../../../models/greenhouse';

import {GreenhousesService} from '../../../services/greenhouses.service';
import {SensorsService} from '../../../services/sensors.service';

import {AppGlobals} from '../../../appglobals';
import {Router} from '@angular/router';
import {fadeInAnimation} from '../../../animations/navigation';
import {staggerAnimation} from '../../../animations/pages';
import {MdSnackBar} from '@angular/material';
@Component({
  moduleId: module.id,
  selector: 'app-greenhouse',
  templateUrl: './greenhouse.component.html',
  styleUrls: ['./greenhouse.component.css'],
  providers: [GreenhousesService, SensorsService, MdDialog],
  animations: [fadeInAnimation, staggerAnimation],
  host: {'[@fadeInAnimation]':''}
})
export class GreenhouseComponent implements OnInit {

  sensors: Sensor[];
  greenhouse: GreenHouse;

  constructor(private greenHousesServices:GreenhousesService, private sensorsservices:SensorsService, private globals:AppGlobals, private modalService: NgbModal, private snackBar: MdSnackBar) 
  { 
    //initialize class objects
    this.sensors = new Array<Sensor>();
    this.greenhouse = null;
  }

  ngOnInit() {
    this.globals.currentGreenHouse.subscribe(greenhouse => this.greenhouse = greenhouse);
    this.globals.addedSensor.subscribe(sensor => { 
      if (sensor != null){
      this.sensors.push(sensor);
      this.snackBar.open("Sensor Added.","Ok", {duration: 2000});
      }
    });
    if(this.greenhouse)
    {
      this.sensorsservices.getGreenHouseSensors(this.greenhouse).subscribe(sensors => this.sensors = sensors);
    }
  }

  update(greenhouse:GreenHouse)
  {
    if(greenhouse)
     {
       this.greenHousesServices.update(greenhouse).subscribe(res => {
         this.snackBar.open("Green House details updated.", "Ok", {duration: 2000});
       });
     } 
  }

  addSensor(){
    this.modalService.open(SensorformComponent, {size:"sm"});
  }

  deleteSensor(sensor:Sensor){

  }
  
}
