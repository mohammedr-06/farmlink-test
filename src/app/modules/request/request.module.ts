import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RequestRoutingModule } from './request-routing.module';
import { FarmerRequestListComponent } from './farmer-request-list/farmer-request-list.component';
import { ApproveCatRequestListComponent } from './approve-cat-request-list/approve-cat-request-list.component';
import { ApproveUnitRequestListComponent } from './approve-unit-request-list/approve-unit-request-list.component';
import { SharedModule } from '../shared/shared.module';
import { SupportRequestListComponent } from './support-request-list/support-request-list.component';

@NgModule({
  declarations: [
    FarmerRequestListComponent,
    ApproveCatRequestListComponent,
    ApproveUnitRequestListComponent,
    SupportRequestListComponent,
  ],
  imports: [CommonModule, RequestRoutingModule, SharedModule, FormsModule],
})
export class RequestModule {}
