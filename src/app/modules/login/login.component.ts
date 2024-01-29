import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert';
import { LoginService } from './login.service';
import { AuthService} from '../auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SubscriptionService } from '../subscription/subscription.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any;
  passwordEyeHide : boolean = true;
  constructor(public fb: FormBuilder, public router: Router, public authService:AuthService,
    public loginService:LoginService, public alertService:AlertService,private spinner: NgxSpinnerService ) {
      if (this.authService.loggedIn) {  
        if( this.authService.getUserType() === 'BUTCHER'){
          this.router.navigate(['/dashboard/butcher']); 
        } else{
          
          this.router.navigate(['/dashboard/farmer']); 
        }
        
      } 
        this.createForm();
        
  }

  ngOnInit() {
   
  }
  createForm() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', Validators.required],
      rememeber_me: [false]
    });
    if(localStorage.getItem('rememberme') === 'true') {
      this.loginForm.patchValue({
        email : localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        rememeber_me: localStorage.getItem('rememberme')
      });
    }
  }
  myPassword() {
    this.passwordEyeHide = !this.passwordEyeHide;
  }
  forgotPasswordClick(){
    this.router.navigate(['/signup/forgot-password']);
  }
  signUpClick() {
    this.router.navigate(['/signup']);
  }
  signInClick(loginForm) {
    this.spinner.show();
    const userInfo = {
      "authemail":loginForm.value.email,
      "authpassword":loginForm.value.password
    }
    if(loginForm.value.rememeber_me) {
      localStorage.setItem("rememberme", "true");
      localStorage.setItem('email', loginForm.value.email);
      localStorage.setItem('password', loginForm.value.password);
    } else{
      localStorage.setItem("rememberme", "false");
      localStorage.setItem('email', "");
      localStorage.setItem('password', "");
    }
   
    this.loginService.authenticateUser(userInfo).subscribe(res => {
      //sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
      //sessionStorage.setItem("access-token",res.authToken);
      const userInfo = {
        "id": res.data.id,
        "contactName": res.data.contactName,
        "phoneNumber": res.data.phoneNumber,
        "accountType": res.data.accountType,
        "userEmail": res.data.userEmail,
        "address": res.data.address,
        "isActiveSubscription" : res['data']['activeSubscription']
      };
      this.authService.setToken(res.authToken,userInfo);
      this.spinner.hide();
      switch(res.data.accountType) { 
        case "BUTCHER": { 
          this.router.navigate(['/dashboard/butcher']); 
           break; 
        } 
        case "FARMER": { 
          this.router.navigate(['/dashboard/farmer']); 
           break; 
        } 
        default: { 
          this.router.navigate(['/dashboard/admin']); 
           break; 
        } 
     } 
        /** spinner ends after 5 seconds */
      
    }, err => {
      this.spinner.hide();
      this.alertService.clear();
       this.alertService.error("UserName and Password is not correct!");
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
      }); 
      console.log("catch", err);
    })
  }
  termsClick(){
    window.open('https://www.farmfreshlink.com/terms-of-service-legal-disclaimer/');
  }
}
