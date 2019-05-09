import { Component, OnInit } from '@angular/core';
import Item from '../Item';
import Account from '../Account';
import Order from '../Order';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AccountService } from '../account.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-db-get',
  templateUrl: './db-get.component.html',
  styleUrls: ['./db-get.component.css']
})
export class DbGetComponent implements OnInit {

  items: Item[];
  accounts: Account[];
  orders: Order[];
  adminLoggedIn: string = window.localStorage.getItem('adminLoggedIn');
  databaseDisplayData: string;
  popupDiv: HTMLDivElement;
  popupImage: SafeStyle;
  mouseX: string;
  mouseY: string;

  constructor(private is: ItemService, private route: ActivatedRoute, private router: Router,
              private sanitizer: DomSanitizer, private as: AccountService, private os: OrderService) {

  }

  ngOnInit() {
    // First check if the admin is logged in.
    if (this.adminLoggedIn === 'false') {
      this.router.navigate(['home']);
    } else {
      this.getObjects();
      // Call the change data on init as we can be redirected back here from
      // the update page, requiring us to set our data + button states again.
      this.changeData(this.databaseDisplayData);
    }
  }

  getObjects(): void {
    // We only want admins to make changes.
    if (this.adminLoggedIn === 'true') {
      // Get our object type first.
      this.databaseDisplayData = window.localStorage.getItem('databaseDisplayData');
      // Get the items.
      this.is.getItems().subscribe((data: Item[]) => {
        this.items = data;
      });
      // Get the accounts.
      this.as.getAccounts().subscribe((data: Account[]) => {
        this.accounts = data;
        });
      // Get the accounts.
      this.os.getOrders().subscribe((data: Order[]) => {
        this.orders = data;
        });
    } else {
      window.alert('You are not an admin!');
      this.router.navigate(['home']);
    }
  }

  deleteObject(id) {
    // We only want admins to make changes to the database
    if (this.adminLoggedIn === 'true') {
      // We need to check what type the item is first.
      if (this.databaseDisplayData === 'items') {
        this.is.deleteItem(id).subscribe(res => {
          console.log('Deleted item: ' + id);
          this.getObjects();
          });
      } else if (this.databaseDisplayData === 'accounts') {
        this.as.deleteAccount(id).subscribe(res => {
          console.log('Deleted account: ' + id);
          this.getObjects();
          });
      } else if (this.databaseDisplayData === 'orders') {
        this.os.deleteOrder(id).subscribe(res => {
          console.log('Deleted order: ' + id);
          this.getObjects();
          });
      }
    } else {
      window.alert('You are not an admin!');
      this.router.navigate(['home']);
    }
  }

  changeData(dataType: string) {
    // First we need to get the button.
    const itemLabel: HTMLLabelElement = document.getElementById('itemLabel') as HTMLLabelElement;
    const accountLabel: HTMLLabelElement = document.getElementById('accountLabel') as HTMLLabelElement;
    const orderLabel: HTMLLabelElement = document.getElementById('orderLabel') as HTMLLabelElement;

    // Then we want to determine which button was pressed.
    if (dataType === 'items') {
      // First we need to change which button is active.
      itemLabel.classList.add('active');
      accountLabel.classList.remove('active');
      orderLabel.classList.remove('active');
      // We set the databaseDisplayData
      window.localStorage.setItem('databaseDisplayData', 'items');
      // Then we want to repopulate the table with the new data.
      this.getObjects();
    } else if (dataType === 'accounts') {
      // First we need to change which button is active.
      itemLabel.classList.remove('active');
      orderLabel.classList.remove('active');
      accountLabel.classList.add('active');
      // We set the databaseDisplayData
      window.localStorage.setItem('databaseDisplayData', 'accounts');
      // Then we want to repopulate the table with the new data.
      this.getObjects();
    } else if (dataType === 'orders') {
      // First we need to change which button is active.
      itemLabel.classList.remove('active');
      orderLabel.classList.add('active');
      accountLabel.classList.remove('active');
      // We set the databaseDisplayData
      window.localStorage.setItem('databaseDisplayData', 'orders');
      // Then we want to repopulate the table with the new data.
      this.getObjects();
    }
  }

  // If the mouse enters the table field with the image url, this function is called.
  mouseEnter(image: string, event: MouseEvent) {
    // First set the mouse location values
    this.mouseX = (event.clientX + 30) + 'px';
    this.mouseY = (event.clientY + 30) + 'px';
    // Then we want to get the popup div so we can edit it's display type
    this.popupDiv = document.getElementById('popupDiv') as HTMLDivElement;
    // Set the popupImage variable to the image URL that was pased in.
    this.popupImage = image;
    // Sanitise the URL so it's able to be used for css.
    this.popupImage = this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    // Set the div to block.
    this.popupDiv.style.display = 'block';
 }

 // When the mouse leaves the table field, this function is called.
 mouseLeave() {
   // We want to hide the div if the mouse leaves the desired area.
   this.popupDiv.style.display = 'none';
 }
}
