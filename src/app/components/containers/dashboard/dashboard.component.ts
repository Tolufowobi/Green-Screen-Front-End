import { Component, OnInit } from '@angular/core';
import {GreenhouseformComponent}  from '../../dialogs/greenhouseform/greenhouseform.component'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute} from '@angular/router';
import {GreenHouse} from '../../../models/GreenHouse';
import {GreenhousesService} from '../../../services/greenhouses.service';

import {AppGlobals} from '../../../appglobals';
import {User} from '../../../models/user';

import {DynamicformComponent} from '../../dynamicform/dynamicform.component';
import {BaseField} from '../../../models/form.models/BaseField';
import {TextBoxField} from '../../../models/form.models/textboxfield'
import {MdSnackBar} from '@angular/material';
import {fadeInAnimation} from '../../../animations/navigation';
import {staggerAnimation} from '../../../animations/pages';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [GreenhousesService],
  animations: [fadeInAnimation, staggerAnimation],
  host: {'[@fadeInAnimation]':''}
})
export class DashboardComponent implements OnInit {

  shelters:GreenHouse[];
  private appuser:User;
  showDialog: boolean;
  constructor(private greenHousesService:GreenhousesService, private globals: AppGlobals, private snackBar : MdSnackBar, private modalService: NgbModal) 
  { 
    this.shelters = new Array<GreenHouse>();
    this.globals.appUser.subscribe(user => {
      if(user){
        this.appuser = user;
      }
    }); 
    if(this.appuser){
      this.greenHousesService.getUserShelters(this.appuser).subscribe(shelters => {
     this.shelters = shelters;
    });
    }
    this.globals.addedShelter.subscribe(shelter => 
      {
        if (shelter == null){
          console.log("Null Shelter");
        }else{
        this.shelters.push(shelter);
        this.snackBar.open("Shelter Added.","Ok", {duration: 2000});
        }
      });
    this.globals.updatedShelter.subscribe(shelter => {
     var gh = this.shelters.find(m => m.id == shelter.id)
     gh = shelter;
    })
  }

  ngOnInit() 
  { 
    console.log('Initializing dashboard componenet');   
  }

  removeShelter(shelter:GreenHouse)
  {
    if (shelter)
    { var self = this;
      this.greenHousesService.delete(shelter).subscribe(res =>{
        if(res = true){
         var index= self.shelters.indexOf(shelter);
         self.shelters.splice(index,1);
         this.snackBar.open("Shelter Deleted", "Ok", {duration: 2000});
        }
      });
    }
  }

  addShelter()
  { 
    const ref =this.modalService.open(GreenhouseformComponent, {size:"sm"});
  }
}
