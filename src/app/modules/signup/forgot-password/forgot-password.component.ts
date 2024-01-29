import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: any;
  passwordEyeHide : boolean = true;
  constructor(public fb: FormBuilder, public router: Router, private signupService:SignupService,
    private spinner: NgxSpinnerService, private alertService: AlertService  ) {
    
       
        
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]]
    });
  }
 
  loginClick() {
    this.router.navigate(['/login']);
  }
  resetPasswordClick(formData) {
    this.spinner.show()
    this.signupService.forgotPasswordUser(formData.value.email).subscribe(res => {
      console.log(res);
      this.spinner.hide(); 
      this.signupService.verificationUser = res;
      this.router.navigate(['/signup/forgot-password-verification']);      
    }, err => {
      this.spinner.hide();
     console.log(err.error.errors);
      console.error("catch", err);
    })  
   
  }
}
