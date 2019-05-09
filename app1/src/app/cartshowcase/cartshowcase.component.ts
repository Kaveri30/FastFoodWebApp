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
  cartOldTotal = 0;
  firstRun = true;

  constructor() {

  }

  ngOnInit() {
    // On initialisation, update the cart contents and sum it.
    this.updateCartContents();
    this.sumCart();
    // After doing the initialising cart, we then set first run to false.
    this.firstRun = false;
    // When initialised, update the cart sum + contents every 1000ms.
    setInterval(() => {
      this.updateCartContents();
      this.sumCart();
    }, 500);
  }

  updateCartContents() {
    const cartDiv = document.getElementById('cartHolder') as HTMLDivElement;
    // Now we want to check to see if the cart is the same as the old, if it is, don't do any calculations.
    if (this.cartTotal === this.cartOldTotal && this.firstRun === false) {
      cartDiv.style.animation = '';
    } else {
      cartDiv.style.animation = 'pulse 0.5s, shake 0.5s';
    }

    // Get cart items
    this.cartContents = JSON.parse(window.localStorage.getItem('cartContents'));
    // If there are no items, display n oitems.
    if (this.cartContents.length === 0) {
      this.cartDisplay = 'No items in cart!';
    } else {
      // Else, display how many items.
      this.cartDisplay = this.cartContents.length + ' items';
    }

    // Set the old cart to this cart, so on the next loop we have a comparison.
    this.cartOldTotal = this.cartTotal;
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
