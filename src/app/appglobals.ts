import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from './models/user';
import {GreenHouse} from './models/greenhouse';
import {Sensor} from './models/sensor';
import {Reading} from './models/reading';

@Injectable()
export class AppGlobals
{
    constructor(){
       //rebroadcast all session variables if they were previously set;
       //login status
       var login = window.localStorage['login'];
       if(login){
           this.broadcastLogin();
       }
       //User
       var user = window.localStorage['user'];
       if(user){
           this.broadcastUser();
       }
       //Current Green House
       var gh = window.localStorage['greenhouse'];
       if(gh){
           this.broadcastCurrentGreenHouse();
       }
       //Current Sensor
       var sensor = window.localStorage['sensor'];
       if(sensor){
           this.broadcastCurrentSensor();
       }
        //Current Reading
        var reading = window.localStorage['reading'];
        if(reading){
            this.broadcastCurrentReading();
        }

        var shelters = window.sessionStorage['userShelters'];
        if(shelters){
            this.broadcastUserShelters();
        }

        var sensors = window.sessionStorage['shelterSensors'];
        if(sensors){
            this.broadcastShelterSensors();
        }

        var readings = window.sessionStorage['sensorReadings'];
        if(readings){
            this.broadcastSensorReadings();
        }
    }
    public isloggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public appUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    public currentGreenHouse: BehaviorSubject<GreenHouse> = new BehaviorSubject<GreenHouse>(null);
    public currentSensor: BehaviorSubject<Sensor> =  new BehaviorSubject<Sensor>(null);
    public currentReading: BehaviorSubject<Reading> = new BehaviorSubject<Reading>(null);
    public changedReading: BehaviorSubject<Reading> = new BehaviorSubject<Reading>(null);
    //Realtion Model Implemenation
    public userShelters: BehaviorSubject<GreenHouse[]>;
    public shelterSensors: BehaviorSubject<Sensor[]>;
    public sensorReadings: BehaviorSubject<Reading[]>;

    public addedShelter: BehaviorSubject<GreenHouse> = new BehaviorSubject<GreenHouse>(null);
    public updatedShelter: BehaviorSubject<GreenHouse> = new BehaviorSubject<GreenHouse>(null);
    public deletedShelter: BehaviorSubject<GreenHouse> = new BehaviorSubject<GreenHouse>(null);

    public addedSensor: BehaviorSubject<Sensor> = new BehaviorSubject<Sensor>(null);
    public updatedSensor: BehaviorSubject<Sensor> = new BehaviorSubject<Sensor>(null);
    public deletedSensor: BehaviorSubject<Sensor> = new BehaviorSubject<Sensor>(null);

    public addedReading: BehaviorSubject<Reading> = new BehaviorSubject<Reading>(null);
    public updatedReading: BehaviorSubject<Reading> = new BehaviorSubject<Reading>(null);
    public deletedReading: BehaviorSubject<Reading> = new BehaviorSubject<Reading>(null);

    setLoginStatus(isLoggedIn)
    {   //save login status
        window.localStorage['login'] = isLoggedIn;
        //broadcast login
        this.broadcastLogin();
    }

    private broadcastLogin(){
        var login = window.localStorage['login'];
        this.isloggedIn.next(login);
    }

    setAppUser(user:User)
    {   
        //save user in session
        window.localStorage['user'] = JSON.stringify(user);
        //broad the app user from local storage;
        this.broadcastUser();
    }

    private broadcastUser()
    {
        var user = JSON.parse(window.localStorage['user']);
        this.appUser.next(user);
    }

    setCurrentGreenHouse(greenhouse:GreenHouse)
    {   //save the currrent green house in session
        window.localStorage['greenhouse'] = JSON.stringify(greenhouse);
        //broad cast from local storage
        this.broadcastCurrentGreenHouse();
    }

    private broadcastCurrentGreenHouse(){
        //retrieve from local storage
        var greenhouse = JSON.parse(window.localStorage['greenhouse']);
        this.currentGreenHouse.next(greenhouse);
    }

    setCurrentSensor(sensor:Sensor)
    {   //save in local storage 
        window.localStorage['sensor'] = JSON.stringify(sensor);
        //broadcast from local storage
        this.broadcastCurrentSensor();
    }

    private broadcastCurrentSensor(){
        //broadcast sensor from storage
        var sensor = JSON.parse(window.localStorage['sensor']);
        this.currentSensor.next(sensor);
    }

    setCurrentReading(reading:Reading)
    {   //save in local storage
        window.localStorage['reading'] = JSON.stringify(reading);
        //broadcast
        this.broadcastCurrentReading();
    }

    private broadcastCurrentReading(){
        //broadcast from local storage
        var reading = JSON.parse(window.localStorage['reading']);
        this.currentReading.next(reading);
    }

    setUserShelters(shelters:GreenHouse[])
    {   //save in local storage 
        window.sessionStorage['userShelters'] = JSON.stringify(shelters);
        //broadcast from local storage
        this.broadcastUserShelters();
    }

    private broadcastUserShelters(){
        //broadcast sensor from storage
        var shelters = JSON.parse(window.localStorage['userShelters']);
        this.userShelters.next(shelters);
    }

    setShelterSensors(sensors:Sensor[])
    {   //save in local storage 
        window.localStorage['shelterSensors'] = JSON.stringify(sensors);
        //broadcast from local storage
        this.broadcastShelterSensors();
    }

    private broadcastShelterSensors(){
        //broadcast sensor from storage
        var sensors = JSON.parse(window.localStorage['shelterSensors']);
        this.shelterSensors.next(sensors);
    }

    setSensorsReadings(readings:Reading[])
    {   //save in local storage 
        window.localStorage['sensorReadings'] = JSON.stringify(readings);
        //broadcast from local storage
        this.broadcastSensorReadings();
    }

    private broadcastSensorReadings(){
        //broadcast sensor from storage
        var readings = JSON.parse(window.localStorage['sensorReadings']);
        this.sensorReadings.next(readings);
    }

    announceChangedReading(reading:Reading)
    {
        if(reading)
        {
            this.changedReading.next(reading);
        } 
    }

    forgetVariables(){
       for (var i = 0; i < window.localStorage.length; i++) {
           let key:string = window.localStorage.key(i);
            window.localStorage.removeItem(key);
       }
    }

    //CRUD announcements
    public readingAdded(reading:Reading){
        this.addedReading.next(reading);
    }

    public readingUpdated(reading: Reading){
        this.updatedReading.next(reading);
    }

    public readingDeleted(reading: Reading){
        this.deletedReading.next(reading);
    }

    public sensorAdded(sensor: Sensor){
        this.addedSensor.next(sensor);
    }

    public sensorUpdated(sensor: Sensor){
        this.updatedSensor.next (sensor)
    }

    public sensorDeleted(sensor: Sensor){
        this.deletedSensor.next(sensor);
    }

    public shelterAdded(shelter: GreenHouse){
        this.addedShelter.next(shelter);
    }

    public shelterUpdated(shelter: GreenHouse){
        this.updatedShelter.next(shelter)
    }

    public shelterDeleted(shelter: GreenHouse){
        this.deletedShelter.next(shelter);   
    }
}