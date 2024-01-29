import {  NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { TemplateModule } from './modules/template/template.module';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { AlertModule } from './modules/shared/alert';
import { MyHttpInterceptor } from './modules/shared/http.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserModule } from "./modules/user/user.module";
import { OrderModule } from './modules/order/order.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SharedModule } from './modules/shared/shared.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { PasswordStrengthComponent} from './modules/shared/password-strength/password-strength.component';
import { SignupModule } from './modules/signup/signup.module';
import { ChatModule } from './modules/chat/chat.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubscriptionDailogComponent } from './modules/subscription/subscription-dailog/subscription-dailog.component';
import { SupportComponent } from './modules/support/support.component';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    SubscriptionDailogComponent,
    SupportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TemplateModule,
    SharedModule,
    UserModule,
    OrderModule,
    AlertModule,
    SignupModule,
    ChatModule,
    GooglePlaceModule,
    InventoryModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule
  ],
  exports: [TemplateModule, AlertModule, NgxPaginationModule],
  providers: [BsModalService, AuthGuard, AuthService,
    MyHttpInterceptor, {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
