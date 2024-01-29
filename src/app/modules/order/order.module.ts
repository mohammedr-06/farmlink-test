import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDefaultComponent } from './order-default/order-default.component';
import { TemplateModule} from '../template/template.module';
import { ViewOrderDetailComponent } from './view-order-detail/view-order-detail.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDefaultComponent,
    ViewOrderDetailComponent
  ],
  imports: [
    CommonModule,
    TemplateModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
