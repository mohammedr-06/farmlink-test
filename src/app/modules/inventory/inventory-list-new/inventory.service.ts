import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventoryRow: any;
  constructor() { }
  inventoryList =[
    {"id":1,"category":"Livestock", "itemName":"Goat", "unitValue":"12", "unit":"Pint" ,"qty":"12"},
    {"id":2,"category":"Livestock", "itemName":"Wild","unitValue":"22", "unit":"Pint" ,"qty":"12"},
    {"id":3,"category":"Livestock", "itemName":"Pig","unitValue":"2", "unit":"Ton" ,"qty":"2"},
    {"id":4,"category":"Dairy", "itemName":"Goat Milk","unitValue":"2", "unit":"Pound" ,"qty":"2"},
    {"id":5,"category":"Dairy", "itemName":"buffalo Milk","unitValue":"2", "unit":"Pound" ,"qty":"2"},
    {"id":6,"category":"Dairy", "itemName":"Cow Milk","unitValue":"2", "unit":"Pound" ,"qty":"2"},
    {"id":7,"category":"Produce", "itemName":"Retail","unitValue":"2", "unit":"Pound" ,"qty":"2"},
    {"id":8,"category":"Other", "itemName":"Soap","unitValue":"1", "unit":"Quart" ,"qty":"2"},
    {"id":9,"category":"Other", "itemName":"Eggs","unitValue":"6", "unit":"Quart" ,"qty":"12"}
  ];
}
