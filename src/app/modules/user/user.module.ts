import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { TemplateModule } from '../template/template.module';
import { TagInputModule } from 'ngx-chips';
import { SharedModule } from '../shared/shared.module';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { NgxMaskModule } from 'ngx-mask';
import { PhoneFormatPipe } from './phone-format.pipe';

@NgModule({
  declarations: [ProfileComponent, LogoutComponent, EditAddressComponent, PhoneFormatPipe],
  imports: [
    CommonModule,
    SharedModule,
    TemplateModule,
    TagInputModule,
    UserRoutingModule,
    NgxMaskModule.forRoot(),
  ],
})
export class UserModule {}
