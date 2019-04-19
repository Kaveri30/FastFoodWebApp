import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    DbAddComponent,
    DbGetComponent,
    DbUpdateComponent,
    MenuItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
