import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { CategoryService } from '../category-list/category.service';

@Component({
  selector: 'app-add-edit-unit',
  templateUrl: './add-edit-unit.component.html',
  styleUrls: ['./add-edit-unit.component.scss']
})
export class AddEditUnitComponent {
  unitRow : any;
  isEdit = false;
  unitForm: FormGroup;
  constructor(public router: Router , private categoryService:CategoryService,private fb: FormBuilder,
    private spinner: NgxSpinnerService,public alertService:AlertService) {
  }
  ngOnInit() {
   this.unitRow = this.categoryService.unitRow;
   this.createForm();
  }
  createForm(){
    if(!this.isEmptyObject(this.unitRow)) {
      this.isEdit = true;
      this.unitForm = this.fb.group({
        id: [this.unitRow.id],
        unitName: [this.unitRow.unitName,Validators.required],
        status: [this.unitRow?.status,Validators.required]
      });
      
    } else {
      this.isEdit = false;
      this.unitForm = this.fb.group({
        id: [''],
        unitName: ['',Validators.required],
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
  submitUnitData(form){
    this.spinner.show();
   const unitInfo = {
    "unitName":form.value.unitName,
    "status":form.value.status
   }
   if(!this.isEdit) {
    this.categoryService.addUnit(unitInfo).subscribe(res => {
      this.spinner.hide();
      setTimeout(() => {
        this.router.navigate(['/manage/unit-list']);
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
    unitInfo['id'] = form.value.id;
    this.categoryService.updateUnit(unitInfo,form.value.id).subscribe(res => {
      this.spinner.hide();
      setTimeout(() => {
        this.router.navigate(['/manage/unit-list']);
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
    this.router.navigate(['/manage/unit-list']);
  }
}
