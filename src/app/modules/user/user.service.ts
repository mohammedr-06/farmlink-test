import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.apiURL;
  constructor(private http: HttpClient) { }
  
  getProfileData(id) {
    const url = this.API_URL+"/farmers/profile/"+ id +"/";
    return this.http.get<any>(url);
  }
  updateContactName(userInfo){
    const url = this.API_URL+"/account/name";
    return this.http.put<any>(url, userInfo);
  }
  updateFarmName(userInfo){
    const url = this.API_URL+"/account/farmname";
    return this.http.put<any>(url, userInfo);
  }
  updateAddress(userInfo){
    const url = this.API_URL+"/account/address";
    return this.http.put<any>(url, userInfo);
  }
  updatePhoneNo(userInfo){
    const url = this.API_URL+"/account/phone";
    return this.http.put<any>(url, userInfo);
  }
  updateCities(CitiesList){
    const url = this.API_URL+"/account/cities";
    return this.http.put<any>(url, CitiesList);
  }
  updateDescr(userInfo){
    const url = this.API_URL+"/account/about";
    return this.http.put<any>(url, userInfo);
  }
  updatePayment(paymentInfo){
    const url = this.API_URL+"/account/payments";
    return this.http.put<any>(url, paymentInfo);
  }
  updateTiming(timeInfo){
    const url = this.API_URL+"/account/timings";
    return this.http.put<any>(url, timeInfo);
  }
  updatePassword(passInfo){
    const url = this.API_URL+"/account/changePassword";
    return this.http.put<any>(url, passInfo);
  }
  updateProfilePic(file){
   const url = this.API_URL+"/account/profilePicture";
   //const url = "https://4459-157-32-36-154.ngrok-free.app/account/profilePicture";
    return this.http.post<any>(url, file); 
  }

}
