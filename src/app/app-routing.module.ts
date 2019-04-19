import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbAddComponent } from './db-add/db-add.component';
import { DbGetComponent } from './db-get/db-get.component';
import { DbUpdateComponent } from './db-update/db-update.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
