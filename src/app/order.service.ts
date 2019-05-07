import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  uri = 'http://localhost:4000/order';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(`${this.uri}`);
  }

  editOrder(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  deleteOrder(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }

  addOrder(orderID, orderCreateTime, orderPayer, orderPurchaseItems) {
    const obj = {
      orderID: orderID,
      orderCreateTime: orderCreateTime,
      orderPayer: orderPayer,
      orderPurchaseItems: orderPurchaseItems
    };
    console.log(obj);
    return this.http.post(`${this.uri}/add`, obj);
    }

  updateOrder(orderID, orderCreateTime, orderPayer, orderPurchaseItems, id) {

    const obj = {
      orderID: orderID,
      orderCreateTime: orderCreateTime,
      orderPayer: orderPayer,
      orderPurchaseItems: orderPurchaseItems
    };
    return this.http.post(`${this.uri}/update/${id}`, obj);
  }
}
