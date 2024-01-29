import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  API_URL = environment.apiURL;
  userInfo : any;
  verificationUser:any;
  constructor(private http: HttpClient) { }
  public saveUser(userInfo) {
    const url = this.API_URL+"/signup/farmer";
    return this.http.post<any>(url, userInfo);
  }
  public saveButcherUser(userInfo) {
    const url = this.API_URL+"/signup/butcher";
    return this.http.post<any>(url, userInfo);
  }
  public validateUser(userInfo) {
    const url = this.API_URL+"/signup/farmer-verify";
    return this.http.post<any>(url, userInfo);
  }
  public bucherValidateUser(userInfo) {
    const url = this.API_URL+"/signup/butcher-verify";
    return this.http.post<any>(url, userInfo);
  }
  public forgotPasswordUser(email) {
    const url = this.API_URL+"/app/users/sendForgotPasswordMail?email="+email;
    return this.http.get<any>(url);
  }
  public verifyForgotPasswordMail(userInfo) {
    const url = this.API_URL+"/app/users/verifyForgotPasswordMail";
    return this.http.post<any>(url, userInfo);
  }
  public setNewPassword(userInfo){
    const url = this.API_URL+"/app/users/setForgotPassword";
    return this.http.put<any>(url, userInfo);
  }
}
