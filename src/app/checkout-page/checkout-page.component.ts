import { Component, OnInit } from '@angular/core';
import { CheckoutPaypalSettings } from 'node_modules/ng-shopping-cart/interfaces/checkout-paypal-settings';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})

export class CheckoutPageComponent implements OnInit {

  // Create a CheckoutPaypalSettings object without our desired variables.
  settings: CheckoutPaypalSettings = {
    business: 'samuel.wilson-3@students.plymouth.ac.uk',
    itemName: 'FastFoodWebApp',
    itemNumber: '1234',
    serviceName: 'MyBusiness',
    country: 'UK'
  };

  headers = {
    empty: 'You have no items in your cart.',
    name: 'Description',
    quantity: 'Amount',
    price: 'Cost',
    total: 'Total x item',
  }
  footers = {
    tax: 'Tax rate',
    shipping: 'Shipping cost',
    total: 'Total cost'
  }

  constructor() {

  }

  ngOnInit() {
  }

}
