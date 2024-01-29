import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alert';
import { ComparePassword } from '../../shared/validation/validation';
import { SignupService } from '../signup.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-farmer-singup',
  templateUrl: './farmer-singup.component.html',
  styleUrls: ['./farmer-singup.component.scss'],
})
export class FarmerSingupComponent {
  sigupForm: any;
  strongPassword = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordEyeHide: boolean = true;
  passRetEyeHide: boolean = true;
  options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };
  options2: any = {
    componentRestrictions: { country: ['IN', 'UK', 'US'] },
  };

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private spinner: NgxSpinnerService,
    private signupService: SignupService,
    public alertService: AlertService
  ) {
    this.createForm();
  }

  handleAddressChange(address: Address) {
    this.sigupForm.get('streetAddress').setValue('');
    this.sigupForm.get('city').setValue('');
    this.sigupForm.get('state').setValue('');
    this.sigupForm.get('zipcode').setValue('');
    this.sigupForm.get('country').setValue('');
    this.sigupForm.get('latitude').setValue('');
    this.sigupForm.get('longitude').setValue('');
    var arr = address.formatted_address.split(',');
    for (var i = 0; i < arr.length; i++) {
      if (i === 0) {
        this.sigupForm.get('streetAddress').setValue(arr[0].trim());
      }
      if (i === 1) {
        this.sigupForm.get('city').setValue(arr[1].trim());
      }
      if (i === 2) {
        if (arr[2] !== '') {
          const narr = arr[2].trim().split(' ');
          console.log(narr);
          this.sigupForm.get('state').setValue(narr[0].trim());
          this.sigupForm.get('zipcode').setValue(narr[1].trim());
        }
      }
      if (i === 3) {
        this.sigupForm.get('country').setValue(arr[3].trim());
      }
    }
    this.sigupForm.get('latitude').setValue(address.geometry.location.lat());
    this.sigupForm.get('longitude').setValue(address.geometry.location.lng());
  }

  ngOnInit() {}
  createForm() {
    this.sigupForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
            ),
            Validators.minLength(8),
          ],
        ],
        confirmpassword: ['', Validators.required],
        farmName: ['', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            // Validators.maxLength(16),
          ],
        ],
        location: [''],
        streetAddress: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required],
        country: ['', Validators.required],
        latitude: [],
        longitude: [],
        termscondition: ['', Validators.requiredTrue],
      },
      {
        validator: ComparePassword('password', 'confirmpassword'),
      }
    );
  }
  onPhoneInput(event: any): void {
    const inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const caretPos = event.target.selectionStart;

    // Check if the backspace key was pressed
    const isBackspace = event.inputType === 'deleteContentBackward';

    let formattedValue;

    if (isBackspace) {
      // If backspace was pressed, adjust formatting accordingly
      if (
        caretPos > 0 &&
        (inputValue[caretPos - 1] === ' ' ||
          inputValue[caretPos - 1] === '-' ||
          inputValue[caretPos - 1] === ')')
      ) {
        // If the character being deleted is a space, hyphen, or closing parenthesis, move the caret one position back
        event.target.setSelectionRange(caretPos - 1, caretPos - 1);
      }

      formattedValue = inputValue
        .replace(/(\d{3})(\d{0,3})?(\d{0,4})?/, '($1) $2-$3')
        .replace(/[-)]$/, '') // Remove trailing hyphen or closing parenthesis
        .trim(); // Remove trailing spaces
    } else {
      // If a digit was added, format accordingly
      formattedValue = inputValue
        .replace(/(\d{3})(\d{0,3})?(\d{0,4})?/, '($1) $2-$3')
        .trim(); // Remove trailing spaces
    }

    this.sigupForm.patchValue({ phone: formattedValue });
  }

  signUpClick(sigupForm) {
    this.spinner.show();
    if (sigupForm.value) {
      const value = sigupForm.value;
      const userInfo = {
        contactName: value.fullName,
        companyName: value.farmName,
        phoneNumber: value.phone,
        userEmail: value.email,
        userPassword: value.password,
        address: {
          address: value.streetAddress,
          city: value.city,
          state: value.state,
          postcode: value.zipcode,
          country: value.country,
          latitude: value.latitude,
          longitude: value.longitude,
        },
      };
      this.signupService.saveUser(userInfo).subscribe(
        (res) => {
          this.spinner.hide();
          userInfo['jwttoken'] = res['jwttoken'];
          userInfo['verificationCode'] = res['verificationCode'];
          this.signupService.userInfo = userInfo;
          this.router.navigate(['/signup/signup-verification']);
        },
        (err) => {
          this.spinner.hide();
          if (err.error.errors[0] === 'Account already exists') {
            this.alertService.clear();
            this.alertService.error('Email address is already exist!');
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }
          console.error('catch', err);
        }
      );
    }
  }
  myPassword() {
    this.passwordEyeHide = !this.passwordEyeHide;
  }
  myRetyPassword() {
    this.passRetEyeHide = !this.passRetEyeHide;
  }
  loginClick() {
    this.router.navigate(['/login']);
  }
  get f() {
    return this.sigupForm.controls;
  }
  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }
}
