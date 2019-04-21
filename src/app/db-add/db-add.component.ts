import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-db-add',
  templateUrl: './db-add.component.html',
  styleUrls: ['./db-add.component.css']
})
export class DbAddComponent implements OnInit {

  angForm: FormGroup;
  adminLoggedIn = window.localStorage.getItem('adminLoggedIn');

  constructor(private fb: FormBuilder, private is: ItemService, private route: ActivatedRoute,
    private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      itemName: ['', Validators.required ],
      itemType: ['', Validators.required ],
      itemPictureLocation: ['', Validators.required ],
      itemPrice: ['', Validators.required ]
    });
  }

  addItem(itemName, itemType, itemPictureLocation, itemPrice) {
    // We want to check if an admin is logged in, we only want admins making changes.
    if (this.adminLoggedIn === 'true') {
      this.route.params.subscribe(params => {
        this.is.addItem(itemName, itemType, itemPictureLocation, itemPrice).subscribe((data:string) =>{
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
      // If not an admin, redirect to home page.
      this.router.navigate(['home']);
    }
  }

}
