import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {


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

  constructor() { }

  ngOnInit() {
  }

}
