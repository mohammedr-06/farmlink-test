import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  API_URL = environment.apiURL;
  categoryRow: any;
  unitRow: any;
  constructor(private http: HttpClient) {}
  categoryList = [];
  public getAllUnitItemForDropDown() {
    const url = this.API_URL + '/unit/getAllUnitDD';
    return this.http.get<any>(url);
  }
  public getAllCategoryForDropDown() {
    const url = this.API_URL + '/category/getAllCategoryDD';
    return this.http.get<any>(url);
  }
  public getAllUnit(data) {
    const url = this.API_URL + '/unit/getAllUnit';
    return this.http.post<any>(url, data);
  }
  public updateUnit(unitinfo, id) {
    const url = this.API_URL + '/unit/updateUnit/' + id;
    return this.http.put<any>(url, unitinfo);
  }
  public addUnit(unitinfo) {
    const url = this.API_URL + '/unit/createUnit';
    return this.http.post<any>(url, unitinfo);
  }
  public deleteUnit(id) {
    const url = this.API_URL + '/unit/deleteUnit/' + id;
    return this.http.delete<any>(url);
  }
  public getCategory(data) {
    const url = this.API_URL + '/category/getAllCategory';
    return this.http.post<any>(url, data);
  }
  public updateCategory(categoryinfo, id) {
    const url = this.API_URL + '/category/updateCategory/' + id;
    return this.http.put<any>(url, categoryinfo);
  }
  public addCategory(categoryinfo) {
    const url = this.API_URL + '/category/addCategory';
    return this.http.post<any>(url, categoryinfo);
  }
  public deleteCategory(id) {
    const url = this.API_URL + '/category/deleteCategory/' + id;
    return this.http.delete<any>(url);
  }
  public getAllArchive(data) {
    const url = this.API_URL + '/item/getArchivedItems?status=Archived';
    return this.http.post<any>(url, data);
  }
}
