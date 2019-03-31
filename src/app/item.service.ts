import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  uri = 'http://localhost:4000/item';

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(`${this.uri}`);
  }

  editItem(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  deleteItem(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }

  addItem(itemName, itemPictureLocation, itemPrice) {
    const obj = {
      itemName: itemName,
      itemPictureLocation: itemPictureLocation,
      itemPrice: itemPrice
    };
    console.log(obj);
    return this.http.post(`${this.uri}/add`, obj);
    }

  updateItem(itemName, itemPictureLocation, itemPrice, id) {

    const obj = {
      itemName: itemName,
      itemPictureLocation: itemPictureLocation,
      itemPrice: itemPrice
    };
    return this.http.post(`${this.uri}/update/${id}`, obj);
  }
}
