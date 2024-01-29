import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  API_URL = environment.apiURL;
  constructor(private http: HttpClient) {}

  getDashboardData() {
    const url = this.API_URL + '/item/alldata/';
    return this.http.get<any>(url);
  }
  getButcherDashboardData() {
    const url = this.API_URL + '/butcher/alldata';
    return this.http.get<any>(url);
  }
}
