import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { CategoryService} from '../category-list/category.service';
import {InventoryService} from '../inventory.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss']
})
export class EditInventoryComponent {
  inventoryForm: FormGroup;
  unitOption:any;
  categoryOption: any;
  inventoryId: any;
  previewImage:any;
  file: File = null;
  fileToUpload: any;
  imageError:any;
  acceptedExtensions = "jpg, jpeg, bmp, png, gif";
  constructor(private fb: FormBuilder,  private categoryService:CategoryService,private router: Router,
    private spinner: NgxSpinnerService,public alertService:AlertService, private inventoryService:InventoryService) {
      this.getAllCategory();
      this.getAllUnitItem();
      this.createForm();
      
  }
  ngOnInit() {
    this.inventoryId = this.inventoryService.inventoryId;
    if(this.inventoryId) {
      this.getInventoryById();
    }else{
      this.router.navigate(['/manage/inventory-list']);
    }
    
  }
 
  onFilechange(event: any) {
    const fileInput = event;
    this.file = fileInput.target.files[0];
}
  createForm(){
    this.inventoryForm = this.fb.group({
      id:[this.inventoryId],
      category: ['', Validators.required],
      categoryName:[''],
      itemName: ['', Validators.required],
      unitValue: [''],
      unit: [''],
      qty: ['', Validators.required],
      price:[''],
      desc: [''],
      trackInventory:[''],
      fileInput:[''],
      fileData:[''],
      preview:['']
    });
  }
  getInventoryById(){
    this.spinner.show();
    this.inventoryService.getInventoryById(this.inventoryId).subscribe(res => {
      this.spinner.hide();
      this.inventoryForm.patchValue({
        category: res.categoryId,
        categoryName: res.categoryName,
        itemName: res.itemName,
        unitValue:res.unitValue,
        unit:res.unitId,
        qty:res.qty,
        price:res.price,
        desc:res.description,
        trackInventory:res.trackInventory
      });
     if(res.inventoryPicture){
      this.previewImage = res.inventoryPicture;
     }
    }, err => {
      this.spinner.hide();
      this.alertService.clear();
      this.alertService.success("not able to get record data!!");
     });
  }
  getAllCategory(){
    this.spinner.show();
    this.categoryService.getAllCategoryForDropDown().subscribe(res => {
      this.categoryOption = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alertService.clear();
      this.alertService.error(err.error.errors[0]);
      window.scroll({ top: 0,  left: 0, behavior: 'smooth'});
      console.error("catch", err);
     });
  }
  getAllUnitItem(){
    this.spinner.show();
    this.categoryService.getAllUnitItemForDropDown().subscribe(res => {
      this.unitOption = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alertService.clear();
      this.alertService.error(err.error.errors[0]);
      window.scroll({ top: 0,  left: 0, behavior: 'smooth'});
      console.error("catch", err);
     });
  }
  cancelClick(){
    this.router.navigate(['/manage/inventory-list']);
  }
  SaveData(item){
    const value = item.value;
    const jsonPayload = {
      "categoryId":value.category,
      "categoryName":value.categoryName,
      "itemName":value.itemName,
      "unitId":value.unit,
      "description":value.desc,
      "price":value.price,
      "qty":value.qty,
      "unitValue":value.unitValue,
      "trackInventory": value.trackInventory,
      "fileInput":value.fileInput,
      "fileData":value.fileData,
      "id": this.inventoryId
    }
    this.inventoryService.editInventory(jsonPayload, this.inventoryId).subscribe(res => {
      this.spinner.hide();
      this.alertService.clear();
      setTimeout(() => {
        this.router.navigate(['/manage/inventory-list']);
       }, 1000);
      this.alertService.success("Record Updated Successfully!");
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });

        
    }); 
  }
  updateInventory(item){
    if(this.file !== null){
      const formData = new FormData();  
      formData.append('multipartFile', this.file);
      this.inventoryService.inventoryPicture(formData, this.inventoryId).subscribe((res: any) => { 
          this.SaveData(item);
        },
         err => {
          this.alertService.clear();
          this.alertService.error(err.error.errors[0]);
          window.scroll({ top: 0,  left: 0, behavior: 'smooth'});
          console.error("catch", err);
        })
    } else {
      this.SaveData(item);
    }
  }
  getSelectedOptionText(event: Event) {
    let selectElementText = event.target['options']
       [event.target['options'].selectedIndex].text;
     this.inventoryForm.patchValue({ 'categoryName':selectElementText }) ;                            
 }
}
