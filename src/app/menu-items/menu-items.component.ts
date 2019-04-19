import { Component, OnInit } from '@angular/core';
import Item from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {

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

}
