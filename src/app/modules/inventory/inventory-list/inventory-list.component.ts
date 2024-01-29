import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { InventoryService } from '../inventory.service';
import { AuthService} from '../../auth/auth.service';
@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent {
  liveArray= [];
  userInfo:any;
  profileData: any;
  itemInventory =[];
  dairyItem=[];
  produceItem=[];
  otherItem=[];
  unitOption :string [];
  constructor(public fb: FormBuilder, public router: Router,private spinner: NgxSpinnerService,
    public alertService:AlertService, public inventoryService:InventoryService , private authService:AuthService) {
      this.userInfo = this.authService.getUserInfo();  
  }
  ngOnInit() {
    this.unitOption = ['None','Fluid ounce','Pint','Quart','Gallon','Ounce','Pound','Stone','Ton'];
    this.getProfileData();
    
   
  }
  isEmptyObject(obj) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
          return false;
      }
  }
  return true;
  }
  addService(){
    this.router.navigate(['/manage/service']);
  }
  getProfileData(){
    this.spinner.show();
    
        const id = this.userInfo.id;
        this.inventoryService.getProfileData(id).subscribe(res => {
          this.spinner.hide();
           console.log(this.isEmptyObject(res['livestock']));
          this.profileData = res;
            if(!this.isEmptyObject(res['livestock'])){
              res['livestock'].forEach(element => {
                this.itemInventory.push({"name":element, "value":0, "unit":"", "unitValue":""});
              });
            }
            if(!this.isEmptyObject(res['dairy'])){
              res['dairy'].forEach(element =>{
                this.dairyItem.push({"name":element, "value":0, "unit":"", "unitValue":""});
              });
            }
            if(!this.isEmptyObject(res['produce'])){
              res['produce'].forEach(element =>{
                this.produceItem.push({"name":element, "value":0, "unit":"", "unitValue":""});
              });
            }
            if(!this.isEmptyObject(res['miscellaneous'])){
              res['miscellaneous'].forEach(element =>{
                this.otherItem.push({"name":element, "value":0,"unit":"", "unitValue":""});
              });
            }
           
           
          console.log(this.itemInventory);
     }, err => {
      this.spinner.hide();
      this.alertService.clear();
         this.alertService.error(err.error.errors[0]);
         window.scroll({ top: 0,  left: 0, behavior: 'smooth'});
       console.error("catch", err);
     });
  }
  minusClick(item){
    console.log(item);
    if(item <= 0){
      return item =0;
    } else {
      return item = (item - 1);
    }
  }
  plusClick(item){
    //var y: number = +x;
     return  item = (item + 1);
    
  }
}
