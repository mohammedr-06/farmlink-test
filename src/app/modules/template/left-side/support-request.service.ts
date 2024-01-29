import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SupportRequestService {
  API_URL = environment.apiURL;

  constructor(private http: HttpClient) {}
  public addCustomerSupport(data) {
    const url = this.API_URL + '/account/addCustomerSupport';
    return this.http.post<any>(url, data);
  }
}
