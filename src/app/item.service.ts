import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  uri = 'http://localhost:4000/item';

  constructor(private http: HttpClient) { }

  AddItem(itemName, itemType, itemPrice) {
    const obj = {
      itemName: itemName,
      itemType: itemType,
      itemPrice: itemPrice
    };
  console.log(obj);
  this.http.post(`${this.uri}/add`, obj)
    .subscribe(res => console.log('Done'));
  }
}
