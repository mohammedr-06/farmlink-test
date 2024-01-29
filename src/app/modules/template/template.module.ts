import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { AlertModule } from '../shared/alert';
import { RouterModule } from '@angular/router';
import { BucherLeftSideComponent } from './bucher-left-side/bucher-left-side.component';
import { MasterLayoutComponent } from './layout/master-layout/master-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LeftSideComponent,
    BucherLeftSideComponent,
    MasterLayoutComponent,
    BlankLayoutComponent,
    AdminLeftSideComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    TemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LeftSideComponent,
    BucherLeftSideComponent,
    MasterLayoutComponent,
    BlankLayoutComponent,
    AdminLeftSideComponent,
  ],
})
export class TemplateModule {}
