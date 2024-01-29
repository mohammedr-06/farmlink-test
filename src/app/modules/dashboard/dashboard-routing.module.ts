import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BucherDashboardComponent } from './bucher-dashboard/bucher-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
const routes: Routes = [
  {path : '', component : DashboardComponent},
  {path : 'farmer', component : DashboardComponent},
  {path : 'butcher', component : BucherDashboardComponent},
  {path : 'admin', component : AdminDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
