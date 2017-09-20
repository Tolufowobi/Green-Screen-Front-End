import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../dialogs/login/login.component';
import {RegisterComponent} from '../dialogs/register/register.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AppGlobals} from '../../appglobals';
import {AuthService} from '../../services/authservice.service';

import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [AuthService]
})
export class ToolbarComponent implements OnInit {
private isLoggedOn: boolean;
public title:string = 'Green Screen';

 constructor(private globals:AppGlobals, private router:Router, private authService:AuthService, private modalService: NgbModal,) {
    this.globals.isloggedIn.subscribe(value => this.isLoggedOn = value)
   }

  ngOnInit() {
    console.log('Initializing toolbar componenet');
  }

  openLoginDialog(){
    this.modalService.open(LoginComponent, {size:"sm"});
  }

  openRegisterDialog(){
    this.modalService.open(RegisterComponent, {size:"sm"});
  }

  logOut() {
    console.log('Log user out');
    this.authService.logOff();
    this.router.navigate(['']);
  }
  

}
