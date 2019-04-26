import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbAddComponent } from './db-add/db-add.component';
import { DbGetComponent } from './db-get/db-get.component';
import { DbUpdateComponent } from './db-update/db-update.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from './item.service';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import {ShoppingCartModule, BaseCartItem} from 'ng-shopping-cart';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminCpComponent } from './admin-cp/admin-cp.component';
import { CreateAccountComponent } from './create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    DbAddComponent,
    DbGetComponent,
    DbUpdateComponent,
    MenuItemsComponent,
    CheckoutPageComponent,
    HomePageComponent,
    LoginPageComponent,
    AdminCpComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShoppingCartModule.forRoot({
      itemType: BaseCartItem,
      serviceType: 'localStorage',
      serviceOptions: {
        storageKey: 'NgShoppingCart',
        clearOnError: true
      }
    }),
    NgbModule,
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
