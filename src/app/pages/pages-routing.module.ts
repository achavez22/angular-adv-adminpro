import { RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core'
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { GraphicsComponent } from "./graphics/graphics.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const routes: Routes =[
    {
        path: 'dashboard',
        component: PagesComponent, 
        children:[
          { path: '', component: DashboardComponent, data: {title: 'Dashboard'}}, 
          { path: 'graphic', component: GraphicsComponent, data: {title: 'graphics'}}, 
          { path: 'progress', component: ProgressComponent, data: {title: 'progress'}}, 
          { path: 'settings', component: AccountSettingsComponent, data: {title: 'settings'}}, 
          { path: 'promises', component: PromisesComponent,data: {title: 'promises'}}, 
          { path: 'rxjs', component: RxjsComponent, data: {title: 'rxjs'}}
          // { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 
        ]
      }, 
]; 


@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class PagesRoutingModule{}