import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  API_URL = environment.apiURL;
  orderId: any;
  orderData: any;
  constructor(private http: HttpClient) {}
  categoryList = [];
  public getAllOrderList(data) {
    //const url = this.API_URL + "/orderDetails/getAll";
    var search = '';
    const url = this.API_URL + '/farmers/getFarmerOrderList';
    return this.http.post<any>(url, data);
  }
  public getOrderById(id) {
    // const url = this.API_URL + "/order/orderchathistory/" + id;
    const url = this.API_URL + '/app/farmers/getOrderHistory/' + id;
    return this.http.get<any>(url);
  }
  public getButcherOrderAll(data) {
    // const url = this.API_URL + "/order/orderchathistory/" + id;
    const url = this.API_URL + '/butcher/getOrderList';
    return this.http.post<any>(url, data);
  }
  public updateOrderStatus(orderId, status) {
    const url =
      this.API_URL +
      '/farmers/updateFarmerOrderStatus?status=' +
      status +
      '&orderNumber=' +
      orderId;
    return this.http.get<any>(url);
  }
}
