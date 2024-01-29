import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alert';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup-butcher-verify',
  templateUrl: './signup-butcher-verify.component.html',
  styleUrls: ['./signup-butcher-verify.component.scss'],
})
export class SignupButcherVerifyComponent {
  sigupForm: any;
  verificationNo: any;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public signupService: SignupService,
    public alertService: AlertService
  ) {
    this.createForm();
    this.verificationNo = this.signupService.userInfo?.verificationCode;
  }
  createForm() {
    this.sigupForm = this.fb.group({
      verificationNo: [
        '',
        [Validators.required, Validators.pattern(/^\d{1,4}$/)],
      ],
    });
  }
  verificationClick(signup) {
    const userInfo = {
      contactName: this.signupService.userInfo?.contactName,
      companyName: this.signupService.userInfo?.companyName,
      phoneNumber: this.signupService.userInfo?.phoneNumber,
      userEmail: this.signupService.userInfo?.userEmail,
      userPassword: this.signupService.userInfo?.userPassword,
      address: this.signupService.userInfo?.address,
      verificationCode: '',
      jwttoken: this.signupService.userInfo?.jwttoken,
    };
    userInfo.verificationCode = signup.value.verificationNo;
    this.signupService.bucherValidateUser(userInfo).subscribe(
      (res) => {
        this.router.navigate(['/signup/thankyou']);
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    );
  }
}
