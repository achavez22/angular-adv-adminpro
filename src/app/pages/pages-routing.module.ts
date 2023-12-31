import { RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core'
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { GraphicsComponent } from "./graphics/graphics.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { AuthGuard } from "../guards/auth.guard";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./maintenance/users/users.component";
import { HospitalsComponent } from "./maintenance/hospitals/hospitals.component";
import { DoctorsComponent } from "./maintenance/doctors/doctors.component";
import { DoctorComponent } from "./maintenance/doctors/doctor.component";

const routes: Routes =[
    {
        path: 'dashboard',
        component: PagesComponent, 
        canActivate: [ AuthGuard ],
        children:[
          { path: '', component: DashboardComponent, data: {title: 'Dashboard'}}, 
          { path: 'graphic', component: GraphicsComponent, data: {title: 'graphics'}}, 
          { path: 'progress', component: ProgressComponent, data: {title: 'progress'}}, 
          { path: 'promises', component: PromisesComponent,data: {title: 'promises'}}, 
          { path: 'rxjs', component: RxjsComponent, data: {title: 'rxjs'}}, 
          { path: 'settings', component: AccountSettingsComponent, data: {title: 'settings'}}, 
          { path: 'profile', component: ProfileComponent, data: {title: 'profile'}}, 
          // { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 

          //Mantenimientos 
          { path: 'usuarios', component: UsersComponent, data: {title: 'usuarios de aplicacion'}}, 
          { path: 'hospitales', component: HospitalsComponent, data: {title: 'Hospitales'}}, 
          { path: 'medicos', component: DoctorsComponent, data: {title: 'Medicos'}}, 
          { path: 'medico/:id', component: DoctorComponent, data: {title: 'Medicos'}}, 

        ]
      }, 
]; 


@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class PagesRoutingModule{}