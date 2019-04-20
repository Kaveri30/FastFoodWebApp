import { Component, OnInit } from '@angular/core';
import Item from '../Item';
import { ItemService } from '../item.service';
import { BaseCartItem, CartService } from 'ng-shopping-cart';

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

  constructor(private is: ItemService, private cartService: CartService<BaseCartItem>) {

  }

  ngOnInit() {
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

  addToCart(item) {
    // Create a base cart item
    const cartItem = new BaseCartItem();
    // Use of + at the start to convert to an integer and must cast type to HTMLInputElement
    const quantity = +(<HTMLInputElement>document.getElementById(item._id)).value;
    // Fill this object our with our items.
    cartItem.setId(item._id);
    cartItem.setName(item.itemName);
    cartItem.setPrice(item.itemPrice);
    cartItem.setQuantity(quantity);

    // By converting our item to a BaseCartItem, we can use all the default functionality

    console.log(cartItem);

    this.cartService.addItem(cartItem);

    console.log(this.cartService.getItems());
  }
}
