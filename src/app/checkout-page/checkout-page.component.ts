import { Component, OnInit } from '@angular/core';
import CartItem from '../CartItem';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import * as $ from 'jquery';
import Item from '../Item';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})

export class CheckoutPageComponent implements OnInit {

  public payPalConfig ?: IPayPalConfig;

  cartContents: CartItem[] = new Array();
  addScript = false;
  cartTotal = 0;
  index = 0;
  cartDisplayTotal = '';

  constructor() {

  }

  ngOnInit() {
    // Get paypal set
    this.initConfig();
    // Get the cart on initialisation.
    this.cartContents = JSON.parse(window.localStorage.getItem('cartContents'));

    this.sumCart();
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'GBP',
        clientId: 'AdOav_GJtaMr-nORWGEre_A0UJENrZ37wfxo_uJbeiTa9QuIYi9Def3NXo-0mVJunRZ_pZiw2lAsq3Gp',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'GBP',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'GBP',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'GBP',
                        value: '9.99',
                    },
                }]
            }]
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: () => {
            console.log('onClick');
        },
    };
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

  checkoutCart() {

  }

  updateCart(inputCart) {
    window.localStorage.setItem('cartContents', JSON.stringify(inputCart));
    this.cartContents = JSON.parse(window.localStorage.getItem('cartContents'));
    this.sumCart();
  }
}
