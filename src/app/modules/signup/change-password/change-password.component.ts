import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignupService } from '../signup.service';
import { AlertService } from '../../shared/alert';
import { ComparePassword } from '../../shared/validation/validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  sigupForm: any;
  passwordEyeHide : boolean = true;
  passRetEyeHide : boolean = true;
  strongPassword: boolean;
 

  constructor(public fb: FormBuilder, public router: Router,private spinner: NgxSpinnerService, 
    private signupService:SignupService,public alertService: AlertService ) {
      if(!this.isEmptyObject(this.signupService.verificationUser?.userEmail)) {
        this.createForm();
      } else{
        this.router.navigate(['/signup/forgot-password']);
        
      } 
  }

  ngOnInit() {
   
  }
  createForm() {

    this.sigupForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
        Validators.minLength(8),
      ]],
      confirmpassword: ['', Validators.required]
    },{
      validator: ComparePassword('password', 'confirmpassword')
    });
  }
  signUpClick(sigupForm){
    this.spinner.show();
   if(sigupForm.value) {
      const value = sigupForm.value;
      const userInfo ={
        "userEmail":  this.signupService.verificationUser.userEmail,
        "userPassword": value.password,
      }
      this.signupService.setNewPassword(userInfo).subscribe(res => {
        this.spinner.hide();
        this.alertService.success("Password Updated Successfully!!...");
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
       // 
      }, err => {
        this.spinner.hide();
       /* if(err.error.errors[0] === 'Account already exists'){
          this.alertService.clear();
          this.alertService.error("Email address is already exist!");
          window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
        }*/
        console.error("catch", err);
      })
     
    }

  }
  myPassword() {
    this.passwordEyeHide = !this.passwordEyeHide;
  }
  myRetyPassword() {
    this.passRetEyeHide = !this.passRetEyeHide;
  }
  loginClick(){
    this.router.navigate(['/login']);
  }
  get f() {
    return this.sigupForm.controls;
  }
  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
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
