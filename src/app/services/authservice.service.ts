import { Injectable } from '@angular/core';
import {HttpModule, Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'

import {AppGlobals} from '../appglobals';
import {ServiceResources} from './serviceresources';

import {User} from '../models/user';

@Injectable()
export class AuthService {
url:string;
  constructor(private http:Http, private globals:AppGlobals, private urlresources:ServiceResources) { 
    this.urlresources.serverUrl.subscribe(value => this.url = value+'/users');
  }

  authenticateUser(username, password): Observable<any>{
    if(!username)
    {
      throw Error("Bad data. Username cannot be an empty string") ;
    }
    if(!password)
    {
      throw Error("Bad data. Password cannot be an empty string"); 
    }
    var headers = new Headers();
    headers.append('Content-Type', 'application/Json; charset=utf-8');
    let self = this
    var user = new User();
    user.username = username;
    user.password = password;
     return this.http.post(this.url+'/auth',user,{headers:headers}).map(res => 
      { if(res){
        var data = res.json();
        var user = new User;
        user.id = data._id;
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.username = data.username;
        user.phone = data.phone;
        //pass the app user to the global variable
        this.globals.setAppUser(user);
        //set the application login status
        this.globals.setLoginStatus(true);
        return true;
      }else{
        return false;
      }
        
      }); 
  }

  registerUser(user:User): Observable<boolean>
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url+'/add', user, {headers:headers}).map(function(res){
     if(res.json() != 'false'){
       return true
     }else{
       return false;
     }
    });
  }

  logOff()
  {
    this.globals.setCurrentGreenHouse(null);
    this.globals.setCurrentReading(null);
    this.globals.setCurrentSensor(null);
    this.globals.setAppUser(null);
    this.globals.setLoginStatus(false);
  }

}
