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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private is: ItemService,
              private fb: FormBuilder) {
                this.createForm();
              }

  createForm() {
    this.angForm = this.fb.group({
      itemName: ['', Validators.required],
      itemPictureLocation: ['', Validators.required],
      itemPrice: ['', Validators.required]
    });
  }

  updateItem(itemName, itemPictureLocation, itemPrice) {
    this.route.params.subscribe(params => {
      this.is.updateItem(itemName, itemPictureLocation, itemPrice, params['id']).subscribe((data: string) =>{
        console.log(data);
        this.router.navigate(['database']);
        });
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.is.editItem(params['id']).subscribe(res => {
        this.item = res;
      });
    });
  }
}
