import { Component, OnInit } from '@angular/core';
import Item from '../Item';
import CartItem from '../CartItem';
import { ItemService } from '../item.service';
import { BaseCartItem, CartService } from 'ng-shopping-cart';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {

  // An initial array to store all the items before sorting.
  items: Item[] = new Array();
  // New arrays to store the sorted data
  mainItems: Item[] = new Array();
  sideItems: Item[] = new Array();
  drinkItems: Item[] = new Array();
  dessertItems: Item[] = new Array();
  // An array for cart
  cart: CartItem[] = new Array();

  constructor(private is: ItemService, private cartService: CartService<BaseCartItem>) {

  }

  ngOnInit() {
    // Get cart items
    this.cart = JSON.parse(window.localStorage.getItem('cartContents'));
    // Get menu items
    this.getItems();
  }

  getItems(): void {
    this.is.getItems().subscribe((data: Item[]) => {
    this.items = data;

    // Loop through the items
    for (const item of this.items) {
      // If the item is of type food
      if (item.itemType === 'main') {
        // Add to mainItems array.
        this.mainItems.push(item);
      } else if (item.itemType === 'side') {
        // Add to sideItems array.
        this.sideItems.push(item);
      } else if (item.itemType === 'drink') {
        // Add to drinkItems array.
        this.drinkItems.push(item);
      } else if (item.itemType === 'dessert') {
        // Add to dessertItems array.
        this.dessertItems.push(item);
      }
    }
    });
  }

  addToCart(inputItem) {
    // First we get the cart contents.
    this.cart = JSON.parse(window.localStorage.getItem('cartContents'));
    // Create a base cart item
    const cartItem = new CartItem();
    // Use of + at the start to convert to a number and must cast type to HTMLInputElement
    const quantity = +(document.getElementById(inputItem._id) as HTMLInputElement).value;
    // Fill this object our with our items.
    cartItem.item = inputItem;
    cartItem.quantity = quantity;

    // Now a flag to see if the cart item already exists, false by default
    let foundItem = false;

    // Now we check to see if this item is already in the cart, if it is, we just increase the quantity.
    for (const currItem of this.cart) {
      if (currItem.item._id === inputItem._id) {
        currItem.quantity += cartItem.quantity;
        foundItem = true;
      }
    }

    // If the item wasn't found in the cart, then add it as a new item.
    if (!foundItem) {
      // Add cart item to the cart
      this.cart.push(cartItem);
    }

    // Set the global variable.
    window.localStorage.setItem('cartContents', JSON.stringify(this.cart));

    this.addedToCart(inputItem._id);
  }

  addedToCart(id) {
    // Get the button and alert that's relevent to the item.
    const alert = document.getElementById(id + 'alert') as HTMLDivElement;
    const button = document.getElementById(id + 'button') as HTMLButtonElement;
    // Hide the button then fade the alert in.
    button.style.display = 'none';
    $('#' + id + 'alert').fadeIn(200);

    // Then, 1750ms later, hide the alert + fade the button in.
    setTimeout(() => {
      alert.style.display = 'none';
      $('#' + id + 'button').fadeIn(200);
    }, 1750);
  }
}
