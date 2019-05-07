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
import { AccountService } from './account.service';
import { OrderService } from './order.service';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminCpComponent } from './admin-cp/admin-cp.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFontAwesomeModule} from 'angular-font-awesome';
import { CartshowcaseComponent } from './cartshowcase/cartshowcase.component';
import { NgxPayPalModule } from 'ngx-paypal';

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
    CreateAccountComponent,
    FooterComponent,
    CartshowcaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AngularFontAwesomeModule,
    NgxPayPalModule,
  ],
  providers: [ItemService, AccountService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
