import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {MaterialModule} from '@angular/material';
import {MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDialogModule, MdInputModule, MdSelectModule, MdGridListModule,MdSlideToggleModule, MdSliderModule, MdTooltipModule, MdSnackBarModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OverlayContainer} from '@angular/material';
import {AppGlobals} from './appglobals'
import {AuthGuard} from './authguard';
import {ServiceResources} from './services/serviceresources';
import {IconsmanagerService} from './services/iconsmanager.service';
import {ChartModule} from 'angular-highcharts';
import {appRoutes} from './app.router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/containers/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { GreenhouseComponent } from './components/containers/greenhouse/greenhouse.component';
import { SensorComponent } from './components/containers/sensor/sensor.component';
import { ReadingComponent } from './components/containers/reading/reading.component';
import { LoginComponent } from './components/dialogs/login/login.component';
import { RegisterComponent } from './components/dialogs/register/register.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DynamicFormFieldComponent } from './components/dynamicformfield/dynamicformfield.component';
import { DynamicformComponent } from './components/dynamicform/dynamicform.component';
import { GreenhouseformComponent } from './components/dialogs/greenhouseform/greenhouseform.component';
import { SensorformComponent } from './components/dialogs/sensorform/sensorform.component';
import { ReadingformComponent } from './components/dialogs/readingform/readingform.component';
import { GreenhousepanelComponent } from './components/datapanels/greenhousepanel/greenhousepanel.component';
import { SensorpanelComponent } from './components/datapanels/sensorpanel/sensorpanel.component';
import { ReadingpanelComponent } from './components/datapanels/readingpanel/readingpanel.component';
import {DataFilterPipe} from './datafilterpipe';
import { IconComponent } from './components/icon/icon.component';
import {DataTableModule} from "angular2-datatable";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    GreenhouseComponent,
    SensorComponent,
    ReadingComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    DynamicFormFieldComponent,
    DynamicformComponent,
    GreenhouseformComponent,
    SensorformComponent,
    ReadingformComponent,
    GreenhousepanelComponent,
    SensorpanelComponent,
    ReadingpanelComponent,
    IconComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdDialogModule,
    MdInputModule,
    MdSelectModule,
    MdGridListModule,
    MdSlideToggleModule, 
    MdSliderModule, 
    MdTooltipModule,
    MdSnackBarModule,
    NgbModule.forRoot(), 
    ChartModule, 
    DataTableModule
  ],
  providers: [AppGlobals, AuthGuard, OverlayContainer, ServiceResources, IconsmanagerService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent, GreenhouseformComponent, SensorformComponent, ReadingformComponent, DynamicformComponent, DynamicFormFieldComponent]
})

export class AppModule { 
  constructor (overlayContainer: OverlayContainer){
  }
}
