import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateModule } from '../template/template.module';
import { OrderModule } from 'ngx-order-pipe';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxSpinnerModule } from "ngx-spinner";
import { PasswordStrengthComponent} from '../shared/password-strength/password-strength.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    PasswordStrengthComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    TemplateModule,
    OrderModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PasswordStrengthComponent,
    OrderModule,
    TemplateModule, GooglePlaceModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    FormsModule,ReactiveFormsModule,TabsModule,BsDropdownModule,BsDatepickerModule
  ]
})
export class SharedModule { }
