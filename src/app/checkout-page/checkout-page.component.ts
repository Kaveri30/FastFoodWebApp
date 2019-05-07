import { Component, OnInit } from '@angular/core';
import CartItem from '../CartItem';
import * as $ from 'jquery';
import Item from '../Item';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})

export class CheckoutPageComponent implements OnInit {

  cartContents: CartItem[] = new Array();
  cartTotal = 0;
  index = 0;
  cartDisplayTotal = '';

  constructor() {

  }

  ngOnInit() {
    // Get the cart on initialisation.
    this.cartContents = JSON.parse(window.localStorage.getItem('cartContents'));

    this.sumCart();
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
    this.cartDisplayTotal = this.cartTotal.toFixed(2);
  }

  emptyCart() {
    // Create a new, empty cart.
    const emptyCart: CartItem[] = new Array();
    // Update the cart with this new empty cart.
    this.updateCart(emptyCart);
  }

  decreaseQuantity(inputItem) {
    // Reset index before use.
    this.index = 0;
    for (const cartItem of this.cartContents) {
      // Increment index on loop.
      this.index++;
      // Check through cart for inputItem
      if (inputItem.item._id === cartItem.item._id) {
        // Remove 1 from the quantity
        cartItem.quantity--;
      }
      // Check if the quantity has reached 0
      if (cartItem.quantity === 0) {
        // If it has, delete the item from the cart.
        this.cartContents.splice(this.index - 1, 1);
      }
    }
    // Set and update cart information.
    this.updateCart(this.cartContents);
  }

  increaseQuantity(inputItem) {
    // Reset index before use.
    this.index = 0;
    for (const cartItem of this.cartContents) {
      // Increment index on loop.
      this.index++;
      // Check through cart for inputItem
      if (inputItem.item._id === cartItem.item._id) {
        // Add 1 from the quantity
        cartItem.quantity++;
      }
      // Check if the quantity has reached 0
      if (cartItem.quantity === 0) {
        // If it has, delete the item from the cart.
        this.cartContents.splice(this.index - 1, 1);
      }
    }
    // Set and update cart information.
    this.updateCart(this.cartContents);
  }

  updateCart(inputCart) {
    window.localStorage.setItem('cartContents', JSON.stringify(inputCart));
    this.cartContents = JSON.parse(window.localStorage.getItem('cartContents'));
    this.sumCart();
  }
}
