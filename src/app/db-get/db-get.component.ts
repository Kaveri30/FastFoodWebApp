import { Component, OnInit } from '@angular/core';
import Item from '../Item';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-db-get',
  templateUrl: './db-get.component.html',
  styleUrls: ['./db-get.component.css']
})
export class DbGetComponent implements OnInit {

  items: Item[];
  adminLoggedIn: string = window.localStorage.getItem('adminLoggedIn');
  popupDiv: HTMLDivElement;
  popupImage: SafeStyle;
  mouseX: string;
  mouseY: string;

  constructor(private is: ItemService, private route: ActivatedRoute, private router: Router
              ,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // First check if the admin is logged in.
    if (this.adminLoggedIn === 'false') {
      this.router.navigate(['home']);
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
    // We only want admins to make changes to the database
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
