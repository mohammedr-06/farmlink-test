import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerSingupComponent } from './farmer-singup/farmer-singup.component';
import { ButchersSignupComponent } from './butchers-signup/butchers-signup.component';
import { SignupTypeComponent } from './signup-type/signup-type.component';
import { SignupVerifyFarmerComponent } from './signup-verify-farmer/signup-verify-farmer.component';
import { SignupButcherVerifyComponent } from './signup-butcher-verify/signup-butcher-verify.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordVerifyComponent } from './forgot-password-verify/forgot-password-verify.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
const routes: Routes = [
  {path : '', component : SignupTypeComponent},
  {path : 'type', component : SignupTypeComponent},
  {path : 'farmer', component : FarmerSingupComponent},
  {path : 'butcher', component : ButchersSignupComponent},
  {path : 'forgot-password', component : ForgotPasswordComponent},
  {path : 'signup-verification', component : SignupVerifyFarmerComponent},
  {path : 'butcher-verification', component : SignupButcherVerifyComponent},
  {path : 'forgot-password-verification', component : ForgotPasswordVerifyComponent},
  {path : 'new-password', component : ChangePasswordComponent},
  {path : 'thankyou', component : ThankYouComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
