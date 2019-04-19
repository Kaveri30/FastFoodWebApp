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

  items: Item[];

  constructor(private is: ItemService, private cartService: CartService<BaseCartItem>) {

  }


  ngOnInit() {
    this.getItems();

    // Used to determine the maximum quantity the user wants.
    const maxQuantity = 10;
    // Fill an array with 0's, meerly used to control the amount of options made.
    const quantityArray = Array(5).fill(0).map((x,i)=>i);
  }

  getItems(): void {
    this.is.getItems().subscribe((data: Item[]) => {
    this.items = data;
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
