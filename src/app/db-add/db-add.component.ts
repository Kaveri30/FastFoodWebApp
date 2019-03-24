import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-db-add',
  templateUrl: './db-add.component.html',
  styleUrls: ['./db-add.component.css']
})
export class DbAddComponent implements OnInit {

  angForm: FormGroup;

  constructor(private fb: FormBuilder, private is: ItemService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      itemName: ['', Validators.required ],
      itemType: ['', Validators.required ],
      itemPrice: ['', Validators.required ]
    });
  }

  AddItem(itemName, itemType, itemPrice) {
    this.is.AddItem(itemName, itemType, itemPrice);
  }

  ngOnInit() {
  }

}
