import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-db-update',
  templateUrl: './db-update.component.html',
  styleUrls: ['./db-update.component.css']
})
export class DbUpdateComponent implements OnInit {

  item: any = {};
  angForm: FormGroup;
  adminLoggedIn = localStorage.getItem('adminLoggedIn');

  constructor(private route: ActivatedRoute,
              private router: Router,
              private is: ItemService,
              private fb: FormBuilder) {
                this.createForm();
              }

  createForm() {
    this.angForm = this.fb.group({
      itemName: ['', Validators.required],
      itemType: ['', Validators.required],
      itemPictureLocation: ['', Validators.required],
      itemPrice: ['', Validators.required]
    });
  }

  updateItem(itemName, itemType, itemPictureLocation, itemPrice) {
    if (this.adminLoggedIn === 'true') {
    this.route.params.subscribe(params => {
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

  ngOnInit() {
    // First check if the admin is logged in.
    if (this.adminLoggedIn === 'false') {
      this.router.navigate(['home']);
    }

    this.route.params.subscribe(params => {
      this.is.editItem(params['id']).subscribe(res => {
        this.item = res;
      });
    });
  }
}
