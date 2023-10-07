import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from "@angular/forms";

import { NgChartsModule } from 'ng2-charts';

import {RouterModule} from '@angular/router'
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
    AccountSettingsComponent, 
    PagesComponent, PromisesComponent, RxjsComponent
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
    ComponentsModule, 
    NgChartsModule
  ], 
  
})
export class PagesModule { }
