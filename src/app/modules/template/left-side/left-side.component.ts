import { Component, TemplateRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SupportRequestService } from './support-request.service';
@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss'],
})
export class LeftSideComponent {
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private supportRequest: SupportRequestService
  ) {}
  requestForm: FormGroup;
  modalRef!: BsModalRef;
  farmerName: any;
  email: any;

  closePopup() {
    this.modalRef.hide();
  }

  openCategoryModel(template: TemplateRef<any>) {
    // Assuming you have a FormBuilder instance named fb
    this.requestForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/),
          // Validators.minLength(14),
          // Validators.maxLength(14),
        ],
      ],
      concern: ['', [Validators.required]],
      status: ['Requested'],

      // farmerId: [farmerId],
    });

    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centereds',
    });
  }

  requestSubmit(formdata) {
    console.log(formdata);
    this.supportRequest.addCustomerSupport(formdata).subscribe(
      (res) => {
        console.log('Category Request Successful', res);
        this.closePopup();
      },
      (error) => {
        console.error('Category Request Error', error);
      }
    );
  }
  formatPhoneNumber(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 10) {
      value = value.slice(0, 10); // Keep only the first 10 digits
    }
    // Format the phone number as (XXX) XXX-XXXX
    input.value = this.formatPhoneNumberString(value);
  }

  private formatPhoneNumberString(value: string): string {
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
}
