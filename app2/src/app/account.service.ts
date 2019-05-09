import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  uri = 'http://localhost:3000/account';

  constructor(private http: HttpClient) { }

  getAccounts() {
    return this.http.get(`${this.uri}`);
  }

  editAccount(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  deleteAccount(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }

  addAccount(accountLogin, accountPassword, accountEmail, isAdmin) {
    const obj = {
      accountLogin: accountLogin,
      accountPassword: accountPassword,
      accountEmail: accountEmail,
      isAdmin: isAdmin
    };
    console.log(obj);
    return this.http.post(`${this.uri}/add`, obj);
    }

  updateAccount(accountLogin, accountPassword, accountEmail, isAdmin, id) {

    const obj = {
      accountLogin: accountLogin,
      accountPassword: accountPassword,
      accountEmail: accountEmail,
      isAdmin: isAdmin
    };
    return this.http.post(`${this.uri}/update/${id}`, obj);
  }
}
