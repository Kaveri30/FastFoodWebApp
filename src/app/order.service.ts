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

  addOrder(orderID, orderCreateTime, orderPayer, orderPurchaseItems, orderUser) {
    const obj = {
      orderID: orderID,
      orderCreateTime: orderCreateTime,
      orderPayer: orderPayer,
      orderPurchaseItems: orderPurchaseItems,
      orderUser: orderUser
    };
    console.log(obj);
    return this.http.post(`${this.uri}/add`, obj);
    }

  updateOrder(orderID, orderCreateTime, orderPayer, orderPurchaseItems, orderUser, id) {

    const obj = {
      orderID: orderID,
      orderCreateTime: orderCreateTime,
      orderPayer: orderPayer,
      orderPurchaseItems: orderPurchaseItems,
      orderUser: orderUser
    };
    return this.http.post(`${this.uri}/update/${id}`, obj);
  }
}
