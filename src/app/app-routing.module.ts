import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/login/login.component';
import { BlankLayoutComponent } from './modules/template/layout/blank-layout/blank-layout.component';
import { MasterLayoutComponent } from './modules/template/layout/master-layout/master-layout.component';
const routes: Routes = [
  { path: '', redirectTo:'/login',pathMatch:'full'},
  { path: 'login', component: BlankLayoutComponent ,
      children: [{
        path: '',
        component: LoginComponent
      }] },
  {
    path: 'signup',
    component:BlankLayoutComponent,
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule),
    data:{ template: 'login' }
  },
  {
    path: 'dashboard',
    component:MasterLayoutComponent,
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    data:{ template: 'master' }
  },
  {
    path: 'user',
    component:MasterLayoutComponent,
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    data:{ template: 'master' }
  },
  {
    path: 'order',
    component:MasterLayoutComponent,
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
    data:{ template: 'master' }
  },
  {
    path: 'request',
    component:MasterLayoutComponent,
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/request/request.module').then(m => m.RequestModule),
    data:{ template: 'master' }
  },
  {
    path: 'manage',
    component:MasterLayoutComponent,
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/inventory/inventory.module').then(m => m.InventoryModule),
    data:{ template: 'master' }
  },
  {
    path: 'chat',
    component:MasterLayoutComponent,
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule),
    data:{ template: 'master' }
  },
  { path: '**', 
  component:BlankLayoutComponent,
  loadChildren: () => import('./modules/general/general-routing.module').then(m => m.GeneralRoutingModule),
  data:{ template: 'login' }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }