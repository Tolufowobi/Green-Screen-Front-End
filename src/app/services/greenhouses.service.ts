import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import {GreenHouse} from '../models/greenhouse';
import {User} from '../models/user';
import {AppGlobals} from '../appglobals';
import {ServiceResources} from './serviceresources';

@Injectable()
export class GreenhousesService {

  url:string;
  appUser:any
  constructor(private http:Http, private urlresources:ServiceResources, private globals: AppGlobals) { 
    this.urlresources.serverUrl.subscribe(value => this.url = value+'/shelters');
  }

  add(greenhouse:GreenHouse): Observable<boolean>
  {
    var self = this;
    var headers= new Headers();
    headers.append('Content-Type', 'application/Json');
    return this.http.post(this.url+'/add',greenhouse,{headers:headers}).map(function(res){
      if(res){
        greenhouse.id = res['_id'];
        self.globals.shelterAdded(greenhouse);
        return true;
      }else{
        return false;
      }
    })
  }

  delete(greenHouse:GreenHouse): Observable<any>
  {
    var self = this;
    return this.http.delete(this.url+'/delete/'+greenHouse.id).map(res => 
      {
        if(res.status != 400){
          self.globals.shelterDeleted(greenHouse);
        }else{
          return false
        }
      });
  }

  update(greenHouse:GreenHouse): Observable<boolean>
  {
    var self = this;
    var headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.put(this.url+'/update', greenHouse, {headers:headers}).map(res => {
       if(res.status != 400){
        self.globals.shelterUpdated(greenHouse);
        return true;
       }else{
         return false;
       }
     });
  }

  getUserShelters(user:User): Observable <GreenHouse[]>
  {
     console.log('getting greenhouses for : ' + user.id + ": " + user.username);
    return this.http.get(this.url+'/usershelters/'+user.id).map(function(shelters){
      let userShelters = new Array<GreenHouse>();
      var results = shelters.json();
      results["Shelters"].forEach(element => {
        var shelter = new GreenHouse();
        shelter.id = element._id;
        shelter.name = element.name;
        shelter.description = element.description;
        shelter.location = element.location;
        userShelters.push(shelter);
      });
      return userShelters;
    });
  }
}
