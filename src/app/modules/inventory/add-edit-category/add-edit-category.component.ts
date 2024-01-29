import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { CategoryService } from '../category-list/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent {
  categoryRow : any;
  isEdit = false;
  categoryForm: FormGroup;
  constructor(public router: Router , private categoryService:CategoryService,private fb: FormBuilder,
    private spinner: NgxSpinnerService,public alertService:AlertService) {
  }
  ngOnInit() {
   this.categoryRow = this.categoryService.categoryRow;
   this.createForm();
  }
  createForm(){
    if(!this.isEmptyObject(this.categoryRow)) {
      this.isEdit = true;
      this.categoryForm = this.fb.group({
        id: [this.categoryRow.id],
        categoryName: [this.categoryRow.categoryName,Validators.required],
        status: [this.categoryRow.status,Validators.required]
      });
      
    } else {
      this.isEdit = false;
      this.categoryForm = this.fb.group({
        id: [''],
        categoryName: ['',Validators.required],
        status: ['Active',Validators.required]
      });
    }
    
  }
  isEmptyObject(obj) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        return false;
      }
    }
    return true;
  }
  submitCategoryData(form){
    this.spinner.show();
   const categoryInfo = {
    "categoryName":form.value.categoryName,
    "status":form.value.status
   }
   if(!this.isEdit) {
    this.categoryService.addCategory(categoryInfo).subscribe(res => {
      this.spinner.hide();
      setTimeout(() => {
        this.router.navigate(['/manage/category-list']);
      }, 1000);
      this.alertService.clear();
      this.alertService.success("Record added Successfully!");
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
    });
    }, err => {
      this.spinner.hide();
      this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0,  behavior: 'smooth' 
      });
      console.error("catch", err);
    })
  
   }else {
    categoryInfo['id'] = form.value.id;
    this.categoryService.updateCategory(categoryInfo,form.value.id).subscribe(res => {
      this.spinner.hide();
      setTimeout(() => {
        this.router.navigate(['/manage/category-list']);
      }, 1000);
      this.alertService.clear();
      this.alertService.success("Record Updated Successfully!");
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
    });
    }, err => {
      this.spinner.hide();
      this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0,  behavior: 'smooth' 
      });
      console.error("catch", err);
    })
   }
  
  }
  cancelClick(){
    this.router.navigate(['/manage/category-list']);
  }
}
