import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesOverviewComponent } from './sales-overview/sales-overview.component';
import { InventorySummaryComponent } from './inventory-summary/inventory-summary.component';
import { TemplateModule } from '../template/template.module';
import { BucherDashboardComponent } from './bucher-dashboard/bucher-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    SalesOverviewComponent,
    InventorySummaryComponent,
    BucherDashboardComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    TemplateModule,
    DashboardRoutingModule,
    CanvasJSAngularChartsModule,
  ],
})
export class DashboardModule {}
