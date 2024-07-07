import { DashbordComponent } from './dashbord/dashbord.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  {path: 'login',component:LoginComponent},
  {path: 'dashbord',component:DashbordComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
  providers: []
})
export class RouteModule { }
