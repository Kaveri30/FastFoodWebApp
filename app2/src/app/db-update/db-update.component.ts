import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ItemService } from '../item.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-db-update',
  templateUrl: './db-update.component.html',
  styleUrls: ['./db-update.component.css']
})
export class DbUpdateComponent implements OnInit {

  object: any = {};
  angForm: FormGroup;
  adminLoggedIn = window.localStorage.getItem('adminLoggedIn');
  databaseDisplayData = window.localStorage.getItem('databaseDisplayData');

  constructor(private route: ActivatedRoute, private router: Router, private is: ItemService,
              private fb: FormBuilder, private as: AccountService) {

    this.createForm();
  }

  createForm() {
    if (this.databaseDisplayData === 'items') {
      this.angForm = this.fb.group({
        itemName: ['', Validators.required],
        itemType: ['', Validators.required],
        itemPictureLocation: ['', Validators.required],
        itemPrice: ['', Validators.required]
      });
    } else if (this.databaseDisplayData === 'accounts') {
      this.angForm = this.fb.group({
        accountLogin: ['', Validators.required],
        accountEmail: ['', Validators.required],
        adminRights: ['', Validators.required]
      });
    }
  }

  updateItem(itemName, itemType, itemPictureLocation, itemPrice) {
    if (this.adminLoggedIn === 'true') {
    this.route.params.subscribe(params => {
      // Here we set the display to items, as it sends back to the get page.
      window.localStorage.setItem('databaseDisplayData', 'items');
      this.is.updateItem(itemName, itemType, itemPictureLocation, itemPrice, params['id']).subscribe((data: string) =>{
        console.log(data);
        this.router.navigate(['database']);
        });
      });
    } else {
      window.alert('You are not an admin!');
      this.router.navigate(['home']);
    }
  }

  updateAccount(accountLogin, accountEmail, adminRights) {
    if (this.adminLoggedIn === 'true') {
    this.route.params.subscribe(params => {
      // Here we set the display to account, as it sends back to the get page.
      window.localStorage.setItem('databaseDisplayData', 'accounts');
      this.as.updateAccount(accountLogin, this.object.accountPassword, accountEmail, adminRights, params['id']).subscribe((data: string) =>{
        console.log(data);
        this.router.navigate(['database']);
        });
      });
    } else {
      window.alert('You are not an admin!');
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    // First check if the admin is logged in.
    if (this.adminLoggedIn === 'false') {
      this.router.navigate(['home']);
    }

    // We want to get the item type again, just incease the page has been refreshed.
    this.databaseDisplayData = window.localStorage.getItem('databaseDisplayData');

    console.log(this.databaseDisplayData);

    if (this.databaseDisplayData === 'items') {
      this.route.params.subscribe(params => {
        this.is.editItem(params['id']).subscribe(res => {
          this.object = res;
        });
      });
    } else if (this.databaseDisplayData === 'accounts') {
      this.route.params.subscribe(params => {
        this.as.editAccount(params['id']).subscribe(res => {
          this.object = res;
        });
      });
    }
  }
}
