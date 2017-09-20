import { Component, OnInit,Input } from '@angular/core';
import {Sensor} from '../../../models/sensor';
import {Router} from '@angular/router';
import {SensorsService} from '../../../services/sensors.service';
import {AppGlobals} from '../../../appglobals';
import {SocketService} from '../../../services/socket.service';

@Component({
  moduleId: module.id,
  selector: 'app-sensorpanel',
  templateUrl: './sensorpanel.component.html',
  styleUrls: ['./sensorpanel.component.css'],
  providers: [SensorsService, AppGlobals, SocketService],
  animations: []
})

export class SensorpanelComponent implements OnInit {

  @Input() sensor:Sensor
  isOn: Boolean
  label:string;
  state:string
  constructor(private sensorsservice: SensorsService, private globals: AppGlobals, private router: Router, private socketService: SocketService) {
    this.socketService.lastConnector = " Sensor Panel"
    if(this.sensor.isOn === true){
      this.state = 'On'
    }else{
      this.state = "Off"
    }
   }

  ngOnInit() {
  }

  clicked(){
    this.globals.setCurrentSensor(this.sensor);
    this.router.navigate(['sensor']);
  }

  toggleSensor(){
    if(this.sensor.isOn == true){
      this.sensor.isOn = false;
      this.state = "Off";
    }else{
      this.sensor.isOn = true;
      this.state = "On";
    }
    this.socketService.changeSensorState(this.sensor);
  }

  stop(){
    return false
  }
}
