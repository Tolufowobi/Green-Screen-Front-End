import { Component, EventEmitter,OnInit } from '@angular/core';
import {AppGlobals} from '../../appglobals';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  outputs: ['appuser: emitUser'],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
loggedOn:boolean = false;
  constructor(private globals: AppGlobals) {
  }

  ngOnInit() {
    this.globals.isloggedIn.subscribe(loggedOn => this.loggedOn =loggedOn);
  }

  
}
