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
      this.route.params.subscribe(params => {
        this.is.addItem(itemName, itemType, itemPictureLocation, itemPrice).subscribe((data:string) =>{
          this.router.navigate(['database']);
        });
      })
    }

  ngOnInit() {
  }

}
