import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService} from "../user.service";
import {  HttpEventType } from '@angular/common/http';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { map } from 'rxjs';
import { AuthService} from '../../auth/auth.service';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
};
options2: any = {
  componentRestrictions: { country: ['IN' , 'UK', 'US']}
}   
contactForm:FormGroup;
userInfo: any;
  constructor( public fb: FormBuilder,public router: Router, private userService:UserService,
    public alertService:AlertService, private authService:AuthService ) {
    this.userInfo = this.authService.getUserInfo();   
  }
  ngOnInit() {
    this.createForm();
    this.getProfileData();
  }
  getProfileData(){
    const id = this.userInfo.id;
    this.userService.getProfileData(id).subscribe(res => {
      this.userInfo = res;
      this.contactForm.controls['address'].setValue(res.address?.address);
      this.contactForm.controls['city'].setValue(res.address?.city);
      this.contactForm.controls['state'].setValue(res.address?.state);
      this.contactForm.controls['zipCode'].setValue(res.address?.postcode);
      this.contactForm.controls['country'].setValue(res.address?.country);
      this.contactForm.controls['latitude'].setValue(res.address?.latitude);
      this.contactForm.controls['longitude'].setValue(res.address?.longitude);
      
  }, err => {
    this.alertService.clear();
      this.alertService.error(err.error.errors[0]);
      window.scroll({ top: 0,  left: 0, behavior: 'smooth'});
    console.error("catch", err);
  });
}
createForm(){
  this.contactForm = this.fb.group({
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    country:['', Validators.required],
    location: [''],
    latitude:[],
    longitude:[],
  });
  console.log(this.contactForm);
} 
  createForm1(address){
    this.contactForm = this.fb.group({
      address: [address?.address, Validators.required],
      city: [address?.city, Validators.required],
      state: [address?.state, Validators.required],
      zipCode: [address?.postcode, Validators.required],
      country:[address?.country, Validators.required],
      location: ['']
    });
    console.log(this.contactForm);
  } 
  cancelClick(){
    this.router.navigate(['/user/profile']);
  }
  submitCategoryData(formData){
    const userData = {
      "address":{
        "address":formData.value.address,
        "city":formData.value.city,
        "state":formData.value.state,
        "postcode":formData.value.zipCode,
        "country":formData.value.country,
        "latitude":formData.value.latitude,
        "longitude":formData.value.longitude
        },
        "id": this.userInfo.id
    };
    this.userService.updateAddress(userData).subscribe(res => {
      this.alertService.clear();
      this.alertService.success("Address is updated Successfully!");
      window.scroll({ top: 0, left: 0,  behavior: 'smooth' 
    });
    setTimeout(() => {
      this.router.navigate(['/user/profile']);
    }, 1000);
      }, err => {
        this.alertService.clear();
       this.alertService.error("Please try again! data is not updated");
       window.scroll({ top: 0, left: 0,  behavior: 'smooth' 
     });
       console.error("catch", err);
     })
  }
  handleAddressChange(address: Address) {
    this.contactForm.controls['address'].setValue("");
    this.contactForm.controls['city'].setValue("");
    this.contactForm.controls['state'].setValue("");
    this.contactForm.controls['zipCode'].setValue("");
    this.contactForm.controls['country'].setValue("");
    this.contactForm.controls['latitude'].setValue("");
    this.contactForm.controls['longitude'].setValue("");
    var arr = address.formatted_address.split(",");
    for(var i=0; i<arr.length; i++)  
    {  
      if(i === 0){
        this.contactForm.controls['address'].setValue(arr[0].trim()); 
      }
      if(i === 1){
        this.contactForm.controls['city'].setValue(arr[1].trim());
      }
      if(i === 2){
        if(arr[2] !== ''){
          const narr = (arr[2].trim()).split(" ");
          console.log(narr);
          this.contactForm.controls['state'].setValue(narr[0].trim());
          this.contactForm.controls['zipCode'].setValue(narr[1].trim());
        }
        
      }
      if(i === 3){
        this.contactForm.controls['country'].setValue(arr[3].trim());
      }
    }
    this.contactForm.controls['latitude'].setValue(address.geometry.location.lat());
    this.contactForm.controls['longitude'].setValue(address.geometry.location.lng());
  }
}
