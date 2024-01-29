import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../../environments/environment';
export interface AutoCompleteModel {
  value: any;
  display: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  url = '';
  errorMessage: any;
  userInfo: any;
  items = [];
  modalRef!: BsModalRef;
  farmForm: FormGroup;
  contactForm: any;
  hrs = [];
  mins = ['00', '30'];
  selectedPayment: any[];
  subscriptionURL: any;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private userService: UserService,
    public alertService: AlertService,
    private modalService: BsModalService,
    private authService: AuthService
  ) {
    this.userInfo = this.authService.getUserInfo();
  }
  ngOnInit() {
    this.subscriptionURL = environment.subscriptionUrl;
    this.errorMessage = '';
    this.getProfileData();
  }

  onSelectFile(event) {
    const fileInput = event;
    let file = fileInput.target.files[0];
    const formData = new FormData();
    formData.append('multipartFile', file);
    this.userService.updateProfilePic(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.url = res.profileImageUrl;
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  getProfileData() {
    const id = this.userInfo.id;
    this.userService.getProfileData(id).subscribe(
      (res) => {
        this.userInfo = res;
        this.url = res.profilePicture;
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  openFarmerModal(template: TemplateRef<any>, name) {
    this.contactForm = this.fb.group({
      farmerName: [name, Validators.required],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  openFarmModal(template: TemplateRef<any>, name) {
    this.contactForm = this.fb.group({
      farmName: [name, Validators.required],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  openEmailModal(template: TemplateRef<any>, name) {
    this.contactForm = this.fb.group({
      emailAddress: [name, Validators.required],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  openPasswordModal(template: TemplateRef<any>, name) {
    this.errorMessage = '';
    this.contactForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  openPhoneModal(template: TemplateRef<any>, name) {
    this.contactForm = this.fb.group({
      phoneNo: [name, Validators.required],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  openAddressModal() {
    this.router.navigate(['/user/edit-address']);
  }
  /* openAddressModal(template: TemplateRef<any>, address, addressType){
    this.contactForm = this.fb.group({
      address: [address?.address, Validators.required],
      city: [address?.city, Validators.required],
      state: [address?.state, Validators.required],
      zipCode: [address?.postcode, Validators.required],
      addresstype:[addressType]
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered'
    });
  } */
  onItemRemoved(event) {
    // console.log(event);
    // console.log(this.items);
  }
  onItemAdded(event) {
    //console.log(event);
    //console.log(this.items);
  }
  openCititesModal(template: TemplateRef<any>, citiesList) {
    this.items = [];
    if (citiesList === undefined || citiesList === null) {
      citiesList = [];
    }
    if (citiesList.length !== 0) {
      citiesList.forEach((element) => {
        if (element !== null) {
          this.items.push(element);
        }
      });
    }
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  openPaymentModal(template: TemplateRef<any>, paymentOption) {
    if (paymentOption === null || paymentOption === undefined) {
      paymentOption = [];
    }
    this.contactForm = this.fb.group({
      cash: [this.isCheckPayment(paymentOption, 'Cash')],
      zelle: [this.isCheckPayment(paymentOption, 'Zelle')],
      check: [this.isCheckPayment(paymentOption, 'Check')],
      banktransfer: [this.isCheckPayment(paymentOption, 'Bank Transfer')],
      bitcoin: [this.isCheckPayment(paymentOption, 'Bitcoin')],
      creditcard: [this.isCheckPayment(paymentOption, 'Credit Card')],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  isCheckPayment(paymentOption, name) {
    return paymentOption.includes(name);
  }
  hrsData() {
    this.hrs = [];
    for (let i = 1; i <= 23; i++) {
      this.mins.forEach((minute) => {
        let str = `${i}:${minute}`;
        this.hrs.push(str);
        // console.log(str);
      });
    }
    this.hrs.unshift('Closed');
  }
  isEndTimeDisabled() {
    return this.contactForm.get('mondayTimingStart').value === 'Closed';
  }
  tuesdayEndTimeDisabled() {
    return this.contactForm.get('tusdayTimingStart').value === 'Closed';
  }
  wednesdayEndTimeDisabled() {
    return this.contactForm.get('wendayTimingStart').value === 'Closed';
  }
  thudayEndTimeDisabled() {
    return this.contactForm.get('thudayTimingStart').value === 'Closed';
  }
  fridEndTimeDisabled() {
    return this.contactForm.get('fridTimingStart').value === 'Closed';
  }
  satdayEndTimeDisabled() {
    return this.contactForm.get('satdayTimingStart').value === 'Closed';
  }
  sundayEndTimeDisabled() {
    return this.contactForm.get('sundayTimingStart').value === 'Closed';
  }
  getTime() {
    console.log('ff');
  }
  openTimeModal(template: TemplateRef<any>, timing) {
    this.hrsData();
    if (timing === undefined || timing === null) {
      timing = [];
    }
    if (timing.length !== 0) {
      timing.forEach((element) => {
        if (element !== null && element.day === 'Monday') {
          timing['mondayTimingStart'] = element.startTime;
          timing['mondayTimingEnd'] = element.endTime;
        } else if (element !== null && element.day === 'Tuesday') {
          timing['tusdayTimingStart'] = element.startTime;
          timing['tusdayTimingEnd'] = element.endTime;
        } else if (element !== null && element.day === 'Wednesday') {
          timing['wendayTimingStart'] = element.startTime;
          timing['wendayTimingEnd'] = element.endTime;
        } else if (element !== null && element.day === 'Thursday') {
          timing['thudayTimingStart'] = element.startTime;
          timing['thudayTimingEnd'] = element.endTime;
        } else if (element !== null && element.day === 'Friday') {
          timing['fridTimingStart'] = element.startTime;
          timing['fridTimingEnd'] = element.endTime;
        } else if (element !== null && element.day === 'Saturday') {
          timing['satdayTimingStart'] = element.startTime;
          timing['satdayTimingEnd'] = element.endTime;
        } else if (element !== null && element.day === 'Sunday') {
          timing['sundayTimingStart'] = element.startTime;
          timing['sundayTimingEnd'] = element.endTime;
        }
      });
    } else {
      timing['mondayTimingStart'] = timing['mondayTimingEnd'] = 0;
      timing['tusdayTimingStart'] = timing['tusdayTimingEnd'] = 0;
      timing['wendayTimingStart'] = timing['wendayTimingEnd'] = 0;
      timing['thudayTimingStart'] = timing['thudayTimingEnd'] = 0;
      timing['fridTimingStart'] = timing['fridTimingEnd'] = 0;
      timing['satdayTimingStart'] = timing['satdayTimingEnd'] = 0;
      timing['sundayTimingStart'] = timing['sundayTimingEnd'] = 0;
    }

    this.contactForm = this.fb.group({
      mondayTimingStart: [timing['mondayTimingStart']],
      mondayTimingEnd: [timing['mondayTimingEnd']],
      tusdayTimingStart: [timing['tusdayTimingStart']],
      tusdayTimingEnd: [timing['tusdayTimingEnd']],
      wendayTimingStart: [timing['wendayTimingStart']],
      wendayTimingEnd: [timing['wendayTimingEnd']],
      thudayTimingStart: [timing['thudayTimingStart']],
      thudayTimingEnd: [timing['thudayTimingEnd']],
      fridTimingStart: [timing['fridTimingStart']],
      fridTimingEnd: [timing['fridTimingEnd']],
      satdayTimingStart: [timing['satdayTimingStart']],
      satdayTimingEnd: [timing['satdayTimingEnd']],
      sundayTimingStart: [timing['sundayTimingStart']],
      sundayTimingEnd: [timing['sundayTimingEnd']],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    }); //modal-lg
  }
  openDescModal(template: TemplateRef<any>, desc) {
    this.contactForm = this.fb.group({
      description: [desc],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  closePopup() {
    this.modalRef.hide();
  }
  farmerNameSubmit(formData) {
    const userData = {
      contactName: formData.value.farmerName,
      id: this.userInfo.id,
    };
    this.userService.updateContactName(userData).subscribe(
      (res) => {
        this.closePopup();
        this.alertService.clear();
        this.alertService.success('Farmer Name is updated Successfully!');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.userInfo = res;
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error('Please try again! data is not updated');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  farmSubmit(formData) {
    const userData = {
      companyName: formData.value.farmName,
      id: this.userInfo.id,
    };
    this.userService.updateFarmName(userData).subscribe(
      (res) => {
        this.closePopup();
        this.alertService.clear();
        this.alertService.success('Farm Name is updated Successfully!');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.userInfo = res;
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error('Please try again! data is not updated');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  passwordSubmit(formData) {
    const userData = {
      newPassword: formData.value.password,
      id: this.userInfo.id,
      confirmPassword: formData.value.confirmpassword,
      oldPassword: formData.value.oldPassword,
    };
    this.userService.updatePassword(userData).subscribe(
      (res) => {
        this.closePopup();
        this.alertService.clear();
        this.alertService.success(res.Message);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        //this.userInfo = res;
      },
      (err) => {
        this.errorMessage = err.error.errors[0];
        console.error('catch', err);
      }
    );
  }
  phoneSubmit(formData) {
    const userData = {
      phoneNumber: formData.value.phoneNo,
      id: this.userInfo.id,
    };
    this.userService.updatePhoneNo(userData).subscribe(
      (res) => {
        this.closePopup();
        this.alertService.clear();
        this.alertService.success('Phone No is updated Successfully!');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.userInfo = res;
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error('Please try again! data is not updated');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }

  timeSubmit(formData) {
    const value = formData.value;
    const mondayStartTime = value.mondayTimingStart;
    const mondayEndTime = value.mondayTimingEnd;
    if (
      mondayStartTime === mondayEndTime &&
      this.contactForm.get('mondayTimingStart').touched &&
      this.contactForm.get('mondayTimingEnd').touched
    ) {
      alert('Start time and end time on Monday cannot be the same.');
      return;
    }
    const tuesdayStartTime = value.tusdayTimingStart;
    const tuesdayEndTime = value.tusdayTimingEnd;

    // Check if Tuesday start time and end time are the same
    if (
      tuesdayStartTime === tuesdayEndTime &&
      this.contactForm.get('tusdayTimingStart').touched &&
      this.contactForm.get('tusdayTimingEnd').touched
    ) {
      alert('Start time and end time on Tuesday cannot be the same.');
      return;
    }
    const wendayStartTime = value.wendayTimingStart;
    const wendayEndTime = value.wendayTimingEnd;

    // Check if Tuesday start time and end time are the same
    if (
      wendayStartTime === wendayEndTime &&
      this.contactForm.get('wendayTimingStart').touched &&
      this.contactForm.get('wendayTimingEnd').touched
    ) {
      alert('Start time and end time on Wednesday cannot be the same.');
      return;
    }
    const thudayStartTime = value.thudayTimingStart;
    const thudayEndTime = value.thudayTimingEnd;

    // Check if Tuesday start time and end time are the same
    if (
      thudayStartTime === thudayEndTime &&
      this.contactForm.get('thudayTimingStart').touched &&
      this.contactForm.get('thudayTimingEnd').touched
    ) {
      alert('Start time and end time on Thursday cannot be the same.');
      return;
    }
    const fridStartTime = value.fridTimingStart;
    const fridEndTime = value.fridTimingEnd;

    // Check if Tuesday start time and end time are the same
    if (
      fridStartTime === fridEndTime &&
      this.contactForm.get('fridTimingStart').touched &&
      this.contactForm.get('fridTimingEnd').touched
    ) {
      alert('Start time and end time on Friday cannot be the same.');
      return;
    }
    const satdayStartTime = value.satdayTimingStart;
    const satdayEndTime = value.satdayTimingEnd;

    // Check if Tuesday start time and end time are the same
    if (
      satdayStartTime === satdayEndTime &&
      this.contactForm.get('satdayTimingStart').touched &&
      this.contactForm.get('satdayTimingEnd').touched
    ) {
      alert('Start time and end time on Saturday cannot be the same.');
      return;
    }
    const sundayStartTime = value.sundayTimingStart;
    const sundayEndTime = value.sundayTimingEnd;

    // Check if Tuesday start time and end time are the same
    if (
      sundayStartTime === sundayEndTime &&
      this.contactForm.get('sundayTimingStart').touched &&
      this.contactForm.get('sundayTimingEnd').touched
    ) {
      alert('Start time and end time on Sunday cannot be the same.');
      return;
    }

    const timeData = [
      {
        day: 'Monday',
        startTime: value.mondayTimingStart,
        endTime: value.mondayTimingEnd,
        open:
          value.mondayTimingStart !== '' && value.mondayTimingEnd !== ''
            ? true
            : false,
      },
      {
        day: 'Tuesday',
        startTime: value.tusdayTimingStart,
        endTime: value.tusdayTimingEnd,
        open:
          value.tusdayTimingStart !== '' && value.tusdayTimingEnd !== ''
            ? true
            : false,
      },
      {
        day: 'Wednesday',
        startTime: value.wendayTimingStart,
        endTime: value.wendayTimingEnd,
        open:
          value.wendayTimingStart !== '' && value.wendayTimingEnd !== ''
            ? true
            : false,
      },
      {
        day: 'Thursday',
        startTime: value.tusdayTimingStart,
        endTime: value.tusdayTimingEnd,
        open:
          value.tusdayTimingStart !== '' && value.tusdayTimingEnd !== ''
            ? true
            : false,
      },
      {
        day: 'Friday',
        startTime: value.fridTimingStart,
        endTime: value.fridTimingEnd,
        open:
          value.fridTimingStart !== '' && value.fridTimingStart !== ''
            ? true
            : false,
      },
      {
        day: 'Saturday',
        startTime: value.satdayTimingStart,
        endTime: value.satdayTimingEnd,
        open:
          value.satdayTimingStart !== '' && value.satdayTimingEnd !== ''
            ? true
            : false,
      },
      {
        day: 'Sunday',
        startTime: value.sundayTimingStart,
        endTime: value.sundayTimingEnd,
        open:
          value.sundayTimingStart !== '' && value.sundayTimingEnd !== ''
            ? true
            : false,
      },
    ];
    this.userService.updateTiming(timeData).subscribe(
      (res) => {
        this.closePopup();
        this.alertService.clear();
        this.alertService.success('Timings updated Successfully!');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.userInfo.timings = res;
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error('Please try again! data is not updated');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  addressSubmit(formData) {
    if (formData.value.addresstype === 'userAdd') {
      const userData = {
        address: {
          address: formData.value.address,
          city: formData.value.city,
          state: formData.value.state,
          postcode: formData.value.zipCode,
        },
        id: this.userInfo.id,
      };
      this.userService.updateAddress(userData).subscribe(
        (res) => {
          this.closePopup();
          this.alertService.clear();
          this.alertService.success('Address is updated Successfully!');
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
          this.userInfo = res;
        },
        (err) => {
          this.alertService.clear();
          this.alertService.error('Please try again! data is not updated');
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
          console.error('catch', err);
        }
      );
    }
  }
  availableCitiesSubmt() {
    const citiesArr = [];

    if (this.items.length !== 0) {
      this.items.forEach((element) => {
        if (element.hasOwnProperty('value')) {
          citiesArr.push(element['value']);
        } else {
          citiesArr.push(element);
        }
      });

      const userData = {
        availableCities: citiesArr,
        id: this.userInfo.id,
      };
      this.userService.updateCities(userData).subscribe(
        (res) => {
          this.closePopup();
          this.alertService.clear();
          this.alertService.success('Availble Cities updated Successfully!');
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
          this.userInfo = res;
        },
        (err) => {
          this.alertService.clear();
          this.alertService.error('Please try again! data is not updated');
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
          console.error('catch', err);
        }
      );
    }
  }
  descriptionSubmit(formData) {
    const userData = {
      aboutus: formData.value.description,
      id: this.userInfo.id,
    };
    this.userService.updateDescr(userData).subscribe(
      (res) => {
        this.closePopup();
        this.alertService.clear();
        this.alertService.success('Description updated Successfully!');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.userInfo = res;
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error('Please try again! data is not updated');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  paymentSubmit(form) {
    this.selectedPayment = [];
    if (form.value.cash) {
      this.selectedPayment.push('Cash');
    }
    if (form.value.check) {
      this.selectedPayment.push('Check');
    }
    if (form.value.creditcard) {
      this.selectedPayment.push('Credit Card');
    }
    if (form.value.banktransfer) {
      this.selectedPayment.push('Bank Transfer');
    }
    if (form.value.bitcoin) {
      this.selectedPayment.push('Bitcoin');
    }
    if (form.value.zelle) {
      this.selectedPayment.push('Zelle');
    }
    const userInfo = {
      paymentMethod: this.selectedPayment,
      id: this.userInfo.id,
    };
    this.userService.updatePayment(userInfo).subscribe(
      (res) => {
        this.closePopup();
        this.alertService.clear();
        this.alertService.success('Payment Method updated Successfully!');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.userInfo = res;
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error('Please try again! data is not updated');
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
}
