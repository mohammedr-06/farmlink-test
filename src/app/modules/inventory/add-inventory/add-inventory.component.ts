import { Component } from '@angular/core';
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
@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent {
  unitOption: any; // ['None','Fluid ounce','Pint','Quart','Gallon','Ounce','Pound','Stone','Ton'];
  categoryOption: any;
  addForm: FormGroup;
  rows: FormArray;
  fileToUpload: any;
  acceptedExtensions = 'jpg, jpeg, bmp, png, gif';
  file: File = null;

  imageError: any;
  isImageSaved: boolean;
  cardImageBase64: any;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public alertService: AlertService,
    private inventoryService: InventoryService
  ) {
    this.addForm = this.fb.group({});
    this.rows = this.fb.array([]);
  }

  ngOnInit() {
    this.getAllCategory();
    this.getAllUnitItem();
    this.addForm.addControl('rows', this.rows);
    this.onAddRow();
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
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      category: ['', Validators.required],
      itemName: ['', Validators.required],
      unitValue: [null, [Validators.min(0)]],
      unit: [''],
      qty: ['', Validators.required],
      price: [''],
      description: [''],
      trackInventory: [true],
      fileInput: [''],
      fileData: [],
      preview: [],
      fileErrormsg: [],
    });
  }

  onFilechange(event: any, index, row) {
    const fileInput = event;
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        this.rows.at(index).get('fileErrormsg').setValue(this.imageError);
        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        this.rows.at(index).get('fileErrormsg').setValue(this.imageError);
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            this.rows.at(index).get('fileErrormsg').setValue(this.imageError);
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
            let file = fileInput.target.files[0];
            let type = file.type;
            let nameFile = file.name;
            let size = file.size;
            let data = {
              base64: String(reader.result),
              size: size,
              name: nameFile,
              type: type,
            };
            this.rows.at(index).get('fileData').setValue(data);
            this.rows
              .at(index)
              .get('preview')
              .setValue(reader.result as string);
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  cancelClick() {
    this.router.navigate(['/manage/inventory-list']);
  }
  submitCategoryData(form) {
    let objec = {};
    let formSAddinvArr: any[] = [];
    const formValue = form.value;
    console.log(formValue.rows);

    formValue.rows.forEach((element) => {
      objec = {
        itemName: element.itemName,
        categoryId: element.category.id,
        categoryName: element.category.categoryName,
        description: element.description,
        unitId: element.unit,
        unitValue: element.unitValue,
        qty: element.qty,
        price: element.price,
        trackInventory: element.trackInventory,
        fileInput: element.fileInput,
        fileData: element.fileData,
      };
      formSAddinvArr.push(objec);
    });
    this.inventoryService.addInventory(formSAddinvArr).subscribe(
      (res) => {
        this.spinner.hide();
        setTimeout(() => {
          this.router.navigate(['/manage/inventory-list']);
        }, 1000);
        this.alertService.clear();
        this.alertService.success('Record added Successfully!');
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      },
      (err) => {
        this.spinner.hide();
        this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
    //inventoryService
  }
}
