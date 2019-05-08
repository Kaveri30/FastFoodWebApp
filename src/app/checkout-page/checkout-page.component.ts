import { Component, OnInit } from '@angular/core';
import CartItem from '../CartItem';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest, ITransactionItem, IUnitAmount } from 'ngx-paypal';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})

export class CheckoutPageComponent implements OnInit {

  public payPalConfig ?: IPayPalConfig;

  cartContents: CartItem[] = new Array();
  paypalCart: ITransactionItem[] = new Array();
  transactionAmount: IUnitAmount;
  addScript = false;
  cartTotal = 0;
  index = 0;
  cartDisplayTotal = '';
  loggedUser = window.localStorage.getItem('loggedUser');

  constructor(private os: OrderService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    // Get the cart on initialisation.
    this.cartContents = JSON.parse(window.localStorage.getItem('cartContents'));
    // Sum the cart up.
    this.sumCart();
    // Now we need to convert the cart into a paypal transaction object array.
    this.convertToPaypalCart();
    // Get paypal set after doing cart
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'GBP',
      clientId: 'AdOav_GJtaMr-nORWGEre_A0UJENrZ37wfxo_uJbeiTa9QuIYi9Def3NXo-0mVJunRZ_pZiw2lAsq3Gp',
      createOrderOnClient: (data) => ({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: this.transactionAmount,
          items: this.paypalCart
      }]
      }) as ICreateOrderRequest,
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
        // A string array for the ordered items.
        let purchaseItems: string[] = new Array();
        // Build a string array of items that were ordered.
        for (const currItem of this.paypalCart) {
          let tempItem = '';
          tempItem = currItem.quantity + ' x ' + currItem.name;
          purchaseItems.push(tempItem);
        }

        // Create the string array with the order payer details.
        const payerDetails: string[] = new Array(data.payer.payer_id,
                                                data.payer.email_address,
                                                data.payer.name.given_name + ' ' + data.payer.name.surname
                                                );

        // After building the ordered items string array, start to build the order item.
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // Empty cart after successful order.
        this.emptyCart();
        // Add order to the database.
        this.route.params.subscribe(params => {
          this.os.addOrder(data.id, data.create_time, payerDetails, purchaseItems).subscribe((data: string) =>{
            // Navigate to successful order page.
            this.router.navigate(['success']);
          });
        });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        if (this.loggedUser === 'admin') {
          return;
        }
      },
    };
  }

  convertToPaypalCart() {
    this.paypalCart = [];
    // Loop through the cart and copy the information from the cart into the paypal object.
    for (const currItem of this.cartContents) {
      // Create our paypal item here, need to
      const transactionItem = {
        name: 'def',
        quantity: 'def',
        unit_amount: {
            currency_code: 'GBP',
            value: 'def',
        }
      };
      transactionItem.name = currItem.item.itemName;
      transactionItem.quantity = '' + currItem.quantity;
      transactionItem.unit_amount.value = '' + currItem.item.itemPrice;
      // Then add the paypal object to the paypal object array.
      this.paypalCart.push(transactionItem);
    }
    console.log('Paypal cart: ');
    console.log(this.paypalCart);
    // Now to make the cart total.
    this.transactionAmount = {
      currency_code: 'GBP',
      value: '' + this.cartTotal,
      breakdown: {
          item_total: {
              currency_code: 'GBP',
              value: '' + this.cartTotal
          }
      }
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

  updateCart(inputCart) {
    window.localStorage.setItem('cartContents', JSON.stringify(inputCart));
    this.cartContents = JSON.parse(window.localStorage.getItem('cartContents'));
    this.sumCart();
    // Now we need to convert the cart into a paypal transaction object array.
    this.convertToPaypalCart();
  }

  goShopping() {
    this.router.navigate(['menu']);
  }
}
