import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import Order from '../Order';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  loggedUser: string = window.localStorage.getItem('loggedUser');
  adminLoggedIn: string = window.localStorage.getItem('adminLoggedIn');
  orders: Order[] = new Array();
  userOrders: Order[] = new Array();
  holderDate: Date;

  constructor(private os: OrderService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    // First check if user is logged in.
    if (this.loggedUser === '') {
      window.alert('You must be logged in to view this page!');
      this.router.navigate(['home']);
    } else if (this.adminLoggedIn === 'true') {
      // If an admin, set the databaseDisplayData to orders
      window.localStorage.setItem('databaseDisplayData', 'orders');
      // Then redirect admins to the admins order database view.
      this.router.navigate(['database']);
    } else {
      this.getOrders();
    }
  }

  getOrders() {
    // Get the accounts.
    this.os.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
      // After getting the orders, we need to sort out the orders
      this.sortOrders();
      });

  }

  sortOrders() {
    // Need a regular for loop to access index + value
    for (let order of this.orders) {
      // If the current order belongs to the user
      if (order.orderUser === this.loggedUser) {
        // We need to convert the time + date into something readable.
        order.orderCreateTime = new Date(order.orderCreateTime).toLocaleDateString()
                                + ' at ' + new Date(order.orderCreateTime).toLocaleTimeString();
        // put this order into the users orders array.
        this.userOrders.push(order);
      }
    }
  }

  goShopping() {
    this.router.navigate(['menu']);
  }

}
