import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { PrivacyTermsComponent } from './privacy-terms/privacy-terms.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    PrivacyTermsComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule
  ]
})
export class GeneralModule { }
