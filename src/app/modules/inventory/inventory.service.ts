import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  API_URL = environment.apiURL;
  inventoryId: any;
  constructor(private http: HttpClient) {}
  inventoryJson = {
    liveStock: [
      {
        title: 'Goat',
        image: 'inventory/goat-icon.png',
        selected: false,
      },
      { title: 'Pig', image: 'inventory/pig-icon.png', selected: false },
      { title: 'Fowl', image: 'inventory/fowl-icon.png', selected: false },
      { title: 'Sheep', image: 'inventory/sheep-icon.png', selected: false },
      { title: 'Goat A1', image: 'inventory/goat-icon.png', selected: false },
      {
        title: 'Chicken',
        image: 'inventory/chicken-icon.png',
        selected: false,
      },
      { title: 'Rabbit', image: 'inventory/rabbit-icon.png', selected: false },
      { title: 'Wild', image: 'inventory/wild-icon.png', selected: false },
    ],
    dairyStock: [
      {
        title: 'Cow Milk',
        image: 'inventory/goat-icon.png',
        selected: false,
      },
      {
        title: 'buffalo Milk',
        image: 'inventory/goat-icon.png',
        selected: false,
      },
      { title: 'Goat Milk', image: 'inventory/goat-icon.png', selected: false },
      { title: 'Cheese', image: 'inventory/sheep-icon.png', selected: false },
    ],
    product: [
      {
        title: 'Bulk Vegetables',
        image: 'inventory/vegetable-icon.png',
        selected: false,
      },
      { title: 'Retail', image: 'inventory/retail-icon.png', selected: false },
    ],
    miscellaneous: [
      {
        title: 'Honey',
        image: 'inventory/honey-icon.png',
        selected: false,
      },
      { title: 'Eggs', image: 'inventory/egg-icon.png', selected: false },
      { title: 'Soap', image: 'inventory/soap-icon.png', selected: false },
    ],
    productFilter: [
      { name: 'Halal', selected: false },
      { name: 'Kosher', selected: false },
      { name: 'Grass Fed', selected: false },
      { name: 'Grain Fed', selected: false },
      { name: 'GMO Free', selected: false },
      { name: 'Custom Feed Program', selected: false },
      { name: 'Hormone Free', selected: false },
    ],
    certified: [
      { name: 'State USDA Certified', selected: false },
      { name: 'Federal USDA Certified', selected: false },
      { name: 'Custom Exempt', selected: false },
    ],
  };

  public addService(serviceInfo) {
    const url = this.API_URL + '/farmers/setup';
    return this.http.put<any>(url, serviceInfo);
  }
  public getProfileData(id) {
    const url = this.API_URL + '/farmers/profile/' + id + '/';
    return this.http.get<any>(url);
  }
  public addInventory(data) {
    const url = this.API_URL + '/item/addItem';
    return this.http.post<any>(url, data);
  }
  public editInventory(data, id) {
    const url = this.API_URL + '/item/updateItem/' + id;
    return this.http.put<any>(url, data);
  }
  public inventoryPicture(data, id) {
    const url = this.API_URL + '/item/addInventoryPicture/' + id;
    return this.http.post<any>(url, data);
  }
  public deleteInventory(id) {
    const url = this.API_URL + '/item/deleteItem/' + id;
    return this.http.delete<any>(url);
  }
  public getAllInventory(data) {
    const url = this.API_URL + '/item/getAllItem';
    return this.http.post<any>(url, data);
  }
  public getInventoryById(id) {
    const url = this.API_URL + '/item/getById/' + id;
    return this.http.get<any>(url);
  }
  public sendNewCategoryRequest(data) {
    const url = this.API_URL + '/inventoryCategory/sendNewCategoryRequest';
    return this.http.post<any>(url, data);
  }
  public sendNewUnitRequest(data) {
    const url = this.API_URL + '/unit/sendNewUnitRequest';
    return this.http.post<any>(url, data);
  }

  public archivedInventory(id, status) {
    const url =
      this.API_URL + '/item/archiveItem?id=' + id + '&status=' + status;
    const body = { id: id, status: status };
    return this.http.post<any>(url, body);
  }
  public unArchivedInventory(id, status) {
    const url =
      this.API_URL + '/item/archiveItem?id=' + id + '&status=' + status;
    const body = { id: id, status: status };
    return this.http.post<any>(url, body);
  }
}
