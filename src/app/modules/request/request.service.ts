import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  API_URL = environment.apiURL;
  farmerId: number;
  categoryId: number;
  unitId: number;
  constructor(private http: HttpClient) {}

  // public getRequestedCategoriesList(farmerId) {
  //   const url =
  //     this.API_URL +
  //     '/inventoryCategory/getRequestedCategoriesListById/?farmerId=' +
  //     farmerId;
  //   return this.http.get<any>(url);
  // }
  public getRequestedCategoriesList(data) {
    const url =
      this.API_URL + '/inventoryCategory/getRequestedCategoriesListById';
    return this.http.post<any>(url, data);
  }
  public getRequestedCategoryList(data) {
    const url = this.API_URL + '/inventoryCategory/getRequestedCategoryList';
    return this.http.post<any>(url, data);
  }
  public getRequestedUnitList(data) {
    const url = this.API_URL + '/unit/getRequestedUnitList';
    return this.http.post<any>(url, data);
  }
  public updateRequestedCategoryList(categoryId, status, comment) {
    const url =
      this.API_URL +
      '/inventoryCategory/updateNewCategoryRequest?categoryId=' +
      categoryId +
      '&status=' +
      status +
      '&comment=' +
      comment;
    return this.http.post<any>(url, categoryId, comment);
  }
  public updateRequestedUnitList(unitId, status, comment) {
    const url =
      this.API_URL +
      '/inventoryCategory/updateNewUnitRequest?unitId=' +
      unitId +
      '&status=' +
      status +
      '&comment=' +
      comment;
    return this.http.post<any>(url, unitId, comment);
  }
  public getAllCustomerSupport(data) {
    const url = this.API_URL + '/account/getAllCustomerSupport';
    return this.http.post<any>(url, data);
  }
}
