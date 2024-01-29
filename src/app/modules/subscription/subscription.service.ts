import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  API_URL = environment.apiURL;
  constructor(private http: HttpClient) { }
 
 getSubscription() { 
    const url = this.API_URL+"/farmers/check-subscription";
    return this.http.get<any>(url);
  }
}
