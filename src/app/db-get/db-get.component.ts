import { Component, OnInit } from '@angular/core';
import Item from '../Item';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-db-get',
  templateUrl: './db-get.component.html',
  styleUrls: ['./db-get.component.css']
})
export class DbGetComponent implements OnInit {

  items: Item[];
  adminLoggedIn = window.localStorage.getItem('adminLoggedIn');

  constructor(private is: ItemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // First check if the admin is logged in.
    if (this.adminLoggedIn === 'false') {
      this.router.navigate(['home']);
      console.log('NOT ADMIN');
    } else {
      console.log('IS ADMIN');
    }
    this.getItems();
    }

  getItems(): void {
    // We only want admins to make changes.
    if (this.adminLoggedIn === 'true') {
      this.is.getItems().subscribe((data: Item[]) => {
        this.items = data;
        });
    } else {
      window.alert('You are not an admin!');
      this.router.navigate(['home']);
    }
  }

  deleteItem(id) {
    // We only want admins to make changes.
    if (this.adminLoggedIn === 'true') {
    this.is.deleteItem(id).subscribe(res => {
      console.log('Deleted item: ' + id);
      this.getItems();
      });
    } else {
      window.alert('You are not an admin!');
      this.router.navigate(['home']);
    }
  }

}
