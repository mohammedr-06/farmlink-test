import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  API_URL = environment.apiURL;
  userInfo: any;
  constructor(private http: HttpClient) {}

  public authenticateUser(userInfo) {
    const url = this.API_URL + '/auth/loginFarmer';
    return this.http.post<any>(url, userInfo);
  }
}
