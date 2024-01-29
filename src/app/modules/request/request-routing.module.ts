import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerRequestListComponent } from './farmer-request-list/farmer-request-list.component';
import { ApproveUnitRequestListComponent } from './approve-unit-request-list/approve-unit-request-list.component';
import { ApproveCatRequestListComponent } from './approve-cat-request-list/approve-cat-request-list.component';
import { SupportRequestListComponent } from './support-request-list/support-request-list.component';
const routes: Routes = [
  { path: '', component: FarmerRequestListComponent },
  { path: 'send-request-list', component: FarmerRequestListComponent },
  { path: 'category-request-list', component: ApproveCatRequestListComponent },
  { path: 'unit-request-list', component: ApproveUnitRequestListComponent },
  { path: 'support-request-list', component: SupportRequestListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRoutingModule {}
