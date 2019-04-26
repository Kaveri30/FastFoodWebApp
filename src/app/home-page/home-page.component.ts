import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomePageComponent implements OnInit {

  loggedUser = window.localStorage.getItem('loggedUser');
  adminLoggedIn = window.localStorage.getItem('adminLoggedIn');
  title = window.localStorage.getItem('title');

  images: string[] = new Array();

  constructor(config: NgbCarouselConfig) {
    config.interval = 4000; // ms
    config.keyboard = false;
  }

  ngOnInit() {
    // Add the banner images to the array
    // Can have as many as needed.
    this.images.push('https://i.imgur.com/7L0eEOt.jpg');
    this.images.push('https://i.imgur.com/YRtvz67.jpg');
    this.images.push('https://i.imgur.com/bHi4RFN.jpg');
  }

}
