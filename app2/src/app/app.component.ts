import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import CartItem from './CartItem';
import { Location } from '@angular/common';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  cart: CartItem[] = new Array();
  title = 'FastFoodWebApp';
  loggedUser = window.localStorage.getItem('loggedUser');
  adminLoggedIn = window.localStorage.getItem('adminLoggedIn');
  cartContents = JSON.parse(window.localStorage.getItem('cartContents'));

  constructor(private loadingBar: SlimLoadingBarService, private router: Router,
              private location: Location) {

    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });

    // If the cart doesn't exist, create it.
    if (!localStorage.getItem('cartContents')) {
      window.localStorage.setItem('cartContents', JSON.stringify(this.cart));
      this.cartContents = JSON.parse(window.localStorage.getItem('cartContents'));
    }

    // Set a global localStorage object for the title, so other pages can access it.
    window.localStorage.setItem('title', this.title);

    // Set the global database item type, starting with items if it's empty
    if (window.localStorage.getItem('databaseDisplayData') === '') {
      window.localStorage.setItem('databaseDisplayData', 'items');
    }

    // If the item doesn't exist, then set it.
    if (!localStorage.getItem('adminLoggedIn')) {
      window.localStorage.setItem('adminLoggedIn', 'false');
    }
    // Redirect to home page.
    // As this is a template to display components, we don't want this directly accessed.
    // Only redirect if the window location is at the root of the website
    if (location.path() === '') {
      this.router.navigate(['home']);
    }

  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }
}
