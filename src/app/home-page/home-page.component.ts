import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  loggedUser = window.localStorage.getItem('loggedUser');
  adminLoggedIn = window.localStorage.getItem('adminLoggedIn');
  title = window.localStorage.getItem('title');

  constructor() {

  }

  ngOnInit() {
  }

}
