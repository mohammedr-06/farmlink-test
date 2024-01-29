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

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent {
  constructor(private modalService: BsModalService, private fb: FormBuilder) {}
  requestForm: FormGroup;

  modalRef!: BsModalRef;

  closePopup() {
    this.modalRef.hide();
  }

  openCategoryModel(template: TemplateRef<any>) {
    // Assuming you have a FormBuilder instance named fb
    this.requestForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      // unitName: ['', unitNameValidators],
      status: ['Requested'],
      date: [new Date()],
      // farmerId: [farmerId],
    });

    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  requestSubmit(formdata) {
    console.log(formdata);
  }
}
