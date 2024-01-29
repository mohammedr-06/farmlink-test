import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {  
  constructor(private _router: Router, private authService:AuthService) { }  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
      if(state.url !== '/dashboard/farmer' && !this.authService.getIsActiveSubscription() && this.authService.getUserType() === 'FARMER'){
        this._router.navigate(['/login']);  
        return false;  
      }
      if (this.authService.loggedIn && this.authService.checkIsLoggedIn ) {  
          return true;  
      } else{
         this._router.navigate(['/login']);  
        return false;  
      }   
      
  }  
} 
