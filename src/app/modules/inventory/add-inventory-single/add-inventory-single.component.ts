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
import { AlertService } from '../../shared/alert';
import { CategoryService } from '../category-list/category.service';
import { InventoryService } from '../inventory.service';
import * as _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-add-inventory-single',
  templateUrl: './add-inventory-single.component.html',
  styleUrls: ['./add-inventory-single.component.scss'],
})
export class AddInventorySingleComponent {
  inventoryForm: FormGroup;
  requestForm: FormGroup;
  unitOption: any;
  categoryOption: any;
  inventoryId: any;
  previewImage: any;
  file: File = null;
  fileToUpload: any;
  imageError: any;
  modalRef!: BsModalRef;
  acceptedExtensions = 'jpg, jpeg, bmp, png, gif';
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    public alertService: AlertService,
    private inventoryService: InventoryService
  ) {
    this.getAllCategory();
    this.getAllUnitItem();
  }
  ngOnInit() {
    this.createForm();
  }

  onFilechange(event: any) {
    const fileInput = event;
    this.file = fileInput.target.files[0];
  }
  createForm() {
    this.inventoryForm = this.fb.group({
      id: [this.inventoryId],
      category: ['', Validators.required],
      categoryName: [''],
      itemName: ['', Validators.required],
      unitValue: ['', [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required],
      qty: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      desc: [''],
      trackInventory: [''],
      fileInput: [''],
      fileData: [''],
      preview: [''],
    });
  }
  getAllCategory() {
    this.spinner.show();
    this.categoryService.getAllCategoryForDropDown().subscribe(
      (res) => {
        this.categoryOption = res;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  getAllUnitItem() {
    this.spinner.show();
    this.categoryService.getAllUnitItemForDropDown().subscribe(
      (res) => {
        this.unitOption = res;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  cancelClick() {
    this.router.navigate(['/manage/inventory-list']);
  }
  SaveData(item) {
    const value = item.value;
    let formSAddinvArr: any[] = [];
    const jsonPayload = {
      categoryId: value.category,
      categoryName: value.categoryName,
      itemName: value.itemName,
      unitId: value.unit,
      description: value.desc,
      price: value.price,
      qty: value.qty,
      unitValue: value.unitValue,
      trackInventory: value.trackInventory,
      fileInput: '',
      fileData: '',
    };
    formSAddinvArr.push(jsonPayload);
    this.inventoryService.addInventory(formSAddinvArr).subscribe(
      (res) => {
        this.inventoryId = res[0]['id'];
        this.pictureInventory();
      },
      (err) => {
        this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  pictureInventory() {
    if (this.file !== null) {
      const formData = new FormData();
      formData.append('multipartFile', this.file);
      this.inventoryService
        .inventoryPicture(formData, this.inventoryId)
        .subscribe(
          (res: any) => {
            this.spinner.hide();
            this.alertService.clear();
            setTimeout(() => {
              this.router.navigate(['/manage/inventory-list']);
            }, 1000);
            this.alertService.success('Record Updated Successfully!');
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          },
          (err) => {
            this.alertService.clear();
            this.alertService.error(err.error.errors[0]);
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            console.error('catch', err);
          }
        );
    } else {
      this.spinner.hide();
      this.alertService.clear();
      setTimeout(() => {
        this.router.navigate(['/manage/inventory-list']);
      }, 1000);
      this.alertService.success('Record Updated Successfully!');
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
  getSelectedOptionText(event: Event) {
    let selectElementText =
      event.target['options'][event.target['options'].selectedIndex].text;
    this.inventoryForm.patchValue({ categoryName: selectElementText });
  }
  closePopup() {
    this.modalRef.hide();
  }
  openCategoryModel(template: TemplateRef<any>, type) {
    const categoryNameValidators =
      type === 'category' ? [Validators.required] : [];
    const unitNameValidators = type === 'unit' ? [Validators.required] : [];

    this.requestForm = this.fb.group({
      categoryName: ['', categoryNameValidators],
      unitName: ['', unitNameValidators],
      status: ['Requested'],
      date: [new Date()],
      categoryType: [type], // Optionally, include categoryType in the form
    });

    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  requestSubmit(formdata) {
    const categoryType = formdata.categoryType || 'unit'; // Default to 'unit' if not present

    if (categoryType === 'category') {
      const categoryPayload = {
        categoryName: formdata.categoryName,
        status: 'Requested',
        date: formdata.date,
      };

      this.inventoryService.sendNewCategoryRequest(categoryPayload).subscribe(
        (res) => {
          console.log('Category Request Successful', res);
          this.closePopup();
        },
        (error) => {
          console.error('Category Request Error', error);
        }
      );
    } else {
      const unitPayload = {
        unitName: formdata.unitName,
        status: 'Requested',
        date: formdata.date,
      };

      this.inventoryService.sendNewUnitRequest(unitPayload).subscribe(
        (res) => {
          console.log('Unit Request Successful', res);
          this.closePopup();
        },
        (error) => {
          console.error('Unit Request Error', error);
        }
      );
    }
  }
}
