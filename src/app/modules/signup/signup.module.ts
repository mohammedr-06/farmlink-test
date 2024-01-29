import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { FarmerSingupComponent } from './farmer-singup/farmer-singup.component';
import { ButchersSignupComponent } from './butchers-signup/butchers-signup.component';
import { SignupTypeComponent } from './signup-type/signup-type.component';
import { SignupVerifyFarmerComponent } from './signup-verify-farmer/signup-verify-farmer.component';
import { SignupButcherVerifyComponent } from './signup-butcher-verify/signup-butcher-verify.component';
import { SharedModule } from '../shared/shared.module';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordVerifyComponent } from './forgot-password-verify/forgot-password-verify.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    FarmerSingupComponent,
    ButchersSignupComponent,
    SignupTypeComponent,
    SignupVerifyFarmerComponent,
    SignupButcherVerifyComponent,
    ThankYouComponent,
    ForgotPasswordComponent,
    ForgotPasswordVerifyComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SignupRoutingModule,
    NgxMaskModule.forRoot(),
  ],
})
export class SignupModule {}
