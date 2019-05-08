import { Component, OnInit } from '@angular/core';
import CartItem from '../CartItem';

@Component({
  selector: 'app-cartshowcase',
  templateUrl: './cartshowcase.component.html',
  styleUrls: ['./cartshowcase.component.css']
})
export class CartshowcaseComponent implements OnInit {

  cartTotal = 0;
  cartDisplayTotal = '';
  cartContents: CartItem[] = new Array();
  cartDisplay: string;

  constructor() {

  }

  ngOnInit() {
    // On initialisation, update the cart contents and sum it.
    this.updateCartContents();
    this.sumCart();
    // When initialised, update the cart sum + contents every 1000ms.
    setInterval(() => {
      this.updateCartContents();
      this.sumCart();
    }, 1000);
  }

  updateCartContents() {
    // Get cart items
    this.cartContents = JSON.parse(window.localStorage.getItem('cartContents'));
    // If there are no items, display n oitems.
    if (this.cartContents.length === 0) {
      this.cartDisplay = 'No items in cart!';
    } else {
      // Else, display how many items.
      this.cartDisplay = this.cartContents.length + ' items';
    }
  }

  sumCart() {
    // Reset cart total before use.
    this.cartTotal = 0;
    // Loop through all of the cart items and sum up the cart total.
    for (const cartItem of this.cartContents) {
        this.cartTotal += cartItem.item.itemPrice * cartItem.quantity;
    }

    // Used to correct any rounding issues that may occur.
    this.cartTotal = +this.cartTotal.toFixed(2);
    // Need to then use a string to be able to keep the 0 on the end of .10 for example.
    this.cartDisplayTotal = this.cartTotal.toFixed(2);
  }

}
