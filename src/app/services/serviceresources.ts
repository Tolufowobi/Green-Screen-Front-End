import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class ServiceResources{

    _serverUrl:string ="";
    serverUrl:BehaviorSubject<string> =new BehaviorSubject<string>('');
    constructor(){
        this.serverUrl.next("http://localhost:3000/client");
    }
}