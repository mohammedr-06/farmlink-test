import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { SupportComponent } from '../support/support.component';
const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'support', component: SupportComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'edit-address', component: EditAddressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
