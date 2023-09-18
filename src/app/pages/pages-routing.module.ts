import { RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core'
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { GraphicsComponent } from "./graphics/graphics.component";

const routes: Routes =[
    {
        path: 'dashboard',
        component: PagesComponent, 
        children:[
          { path: '', component: DashboardComponent}, 
          { path: 'graphic', component: GraphicsComponent}, 
          { path: 'progress', component: ProgressComponent}, 
          // { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 
        ]
      }, 
]; 


@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class PagesRoutingModule{}