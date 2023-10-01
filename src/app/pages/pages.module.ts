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

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
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
