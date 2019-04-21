import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { BaseCartItem, CartService } from 'ng-shopping-cart';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'FastFoodApp';
  constructor(private loadingBar: SlimLoadingBarService, private router: Router, private cartService: CartService<BaseCartItem>) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    // We want to set the cart to use GBP instead of USD.
    this.cartService.setLocaleFormat('GBP');

    // If the item doesn't exist, then set it.
    if (!localStorage.getItem('adminLoggedIn')) {
      window.localStorage.setItem('adminLoggedIn', 'false');
    }
    // Redirect to home page.
    // As this is a template to display components, we don't want this directly accessed.
    this.router.navigate(['home']);
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
