import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDefaultComponent } from './order-default/order-default.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ViewOrderDetailComponent } from './view-order-detail/view-order-detail.component';
const routes: Routes = [
  {path : '', component : OrderDefaultComponent},
  {path : 'list', component : OrderListComponent},
  {path : 'view-order', component : ViewOrderDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
