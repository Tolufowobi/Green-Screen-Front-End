import { Component, OnInit, Input } from '@angular/core';
import {Reading} from '../../../models/reading';
import {Router} from '@angular/router';
import {ReadingsService} from '../../../services/readings.service';
import {AppGlobals} from '../../../appglobals';
import {SocketService} from '../../../services/socket.service';
@Component({
  selector: 'app-readingpanel',
  templateUrl: './readingpanel.component.html',
  styleUrls: ['./readingpanel.component.css'],
  providers: [ReadingsService, AppGlobals, SocketService],
})
export class ReadingpanelComponent implements OnInit {

  @Input() reading: Reading;
  constructor(private router:Router, private globals: AppGlobals, private readingsservice:ReadingsService, private socketService: SocketService) { 
    this.socketService.lastConnector = "Reading Panel"
    this.socketService.readingTransmission.subscribe(read =>{
      if(read){
        if(read.id == this.reading.id){
        this.reading.value = read.value;
        }
      }
    });
    
  }

  ngOnInit() {
    console.log('init...' + this.reading.id);
  }

  clicked()
  {
    this.globals.setCurrentReading(this.reading);
    this.router.navigate(['reading']);
  }

  incr(){
    this.reading.value += 1;
    this.socketService.changeReadingValue(this.reading);
    return false
  }

  decr(){
    this.reading.value -=1;
    this.socketService.changeReadingValue(this.reading);
    return false
  }

}
