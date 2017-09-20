import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {DashboardComponent} from './components/containers/dashboard/dashboard.component';
import {GreenhouseComponent} from './components/containers/greenhouse/greenhouse.component';
import {SensorComponent} from './components/containers/sensor/sensor.component';
import {ReadingComponent} from './components/containers/reading/reading.component';
import {AuthGuard} from './authguard';

export const appRoutes: Routes = [
    {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {animation:''}},
    {path:'greenhouse', component: GreenhouseComponent, canActivate: [AuthGuard], data: {animation:''}},
    {path: 'sensor', component: SensorComponent, canActivate: [AuthGuard], data: {animation:''}},
    {path: 'reading', component: ReadingComponent, canActivate: [AuthGuard], data: {animation:''}},
    {path:'', component:MainComponent, data: {animation:''}}
];  