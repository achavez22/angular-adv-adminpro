import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgChartsModule } from 'ng2-charts';

import {RouterModule} from '@angular/router'
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { PipesModule } from '../pipes/pipes.module';
import { DoctorComponent } from './maintenance/doctors/doctor.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
    AccountSettingsComponent, 
    PagesComponent, 
    PromisesComponent, 
    RxjsComponent, 
    ProfileComponent, 
    UsersComponent, 
    HospitalsComponent, 
    DoctorsComponent, 
    DoctorComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
    AccountSettingsComponent, 
    PagesComponent
  ], 
  imports: [
    CommonModule, 
    SharedModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ComponentsModule, 
    NgChartsModule, 
    PipesModule
  ], 
  
})
export class PagesModule { }
