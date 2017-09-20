import { Component, OnInit, Input } from '@angular/core';
import {GreenHouse} from '../../../models/greenhouse';
import {User} from '../../../models/user';
import {Router} from '@angular/router';
import {AppGlobals} from '../../../appglobals';

@Component({       
    
  moduleId: module.id,
  selector: 'app-greenhousepanel',
  templateUrl: './greenhousepanel.component.html',
  styleUrls: ['./greenhousepanel.component.css'],
  animations: [],
})
export class GreenhousepanelComponent implements OnInit {

    @Input() greenhouse: GreenHouse;
    mouseOn: boolean
  constructor(private globals: AppGlobals, private router:Router) { }

  ngOnInit() {
  }

  clicked(){
    this.globals.setCurrentGreenHouse(this.greenhouse);
    this.router.navigate(['greenhouse']);
  }

  stop(){
    return false
  }
}
