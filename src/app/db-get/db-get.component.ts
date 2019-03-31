import { Component, OnInit } from '@angular/core';
import Item from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-db-get',
  templateUrl: './db-get.component.html',
  styleUrls: ['./db-get.component.css']
})
export class DbGetComponent implements OnInit {

  items: Item[];

  constructor(private is: ItemService) { }

  ngOnInit() {
    this.getItems();
    }

  getItems(): void {
    this.is.getItems().subscribe((data: Item[]) => {
    this.items = data;
    });
  }

  deleteItem(id) {
    this.is.deleteItem(id).subscribe(res => {
      console.log('Deleted item: ' + id);
      this.getItems();
      });
  }

}
