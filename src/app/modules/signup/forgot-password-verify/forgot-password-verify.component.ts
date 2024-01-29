import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';
import { AlertService } from '../../shared/alert';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-forgot-password-verify',
  templateUrl: './forgot-password-verify.component.html',
  styleUrls: ['./forgot-password-verify.component.scss']
})
export class ForgotPasswordVerifyComponent {
  sigupForm: any;
  verificationNo : any;
  constructor(public fb: FormBuilder, public router: Router,
     public signupService:SignupService,public alertService: AlertService, private spinner: NgxSpinnerService ) {
    this.createForm();
    this.verificationNo = this.signupService.verificationUser?.verificationCode;
  }
  createForm() {

    this.sigupForm = this.fb.group({
      verificationNo: ['', Validators.required]
    });
  }
  verificationClick(formData){
    this.spinner.show()
    const userInfo = {
      userEmail: this.signupService.verificationUser.userEmail,
      verificationCode: formData.value.verificationNo
    }
    this.signupService.verifyForgotPasswordMail(userInfo).subscribe(res => {
      console.log(res);
      this.spinner.hide();       
      this.router.navigate(['/signup/new-password']);      
    }, err => {
      this.spinner.hide();
      if(!this.isEmptyObject(err?.error?.errors)){
        this.alertService.clear();         
        this.alertService.error(err.error.errors[0]);
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
      });
        
      }
      console.error("catch", err);
    }) 
   
  }
  isEmptyObject(obj) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        return false;
      }
    }
    return true;
  }
}
