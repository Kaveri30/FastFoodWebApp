import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbAddComponent } from './db-add/db-add.component';
import { DbGetComponent } from './db-get/db-get.component';
import { DbUpdateComponent } from './db-update/db-update.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminCpComponent } from './admin-cp/admin-cp.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
  path: 'database/create',
  component: DbAddComponent
  },
  {
    path: 'database/update/:id',
    component: DbUpdateComponent
  },
  {
    path: 'database',
    component: DbGetComponent
  },
  {
    path: 'menu',
    component: MenuItemsComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'adminCP',
    component: AdminCpComponent
  },
  {
    path: 'accountcreate',
    component: CreateAccountComponent
  },
  {
    path: 'success',
    component: SuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
