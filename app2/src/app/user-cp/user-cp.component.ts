import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-cp',
  templateUrl: './user-cp.component.html',
  styleUrls: ['./user-cp.component.css']
})
export class UserCpComponent implements OnInit {

  loggedUser = window.localStorage.getItem('loggedUser');
  adminLoggedIn: string = window.localStorage.getItem('adminLoggedIn');

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
    // .
  }

  ngOnInit() {
    // Need to check if admin, we don't want non-admins here.
    if (this.loggedUser === '') {
      window.alert('You must be logged in to view this page!');
      this.router.navigate(['home']);
    } else if (this.adminLoggedIn === 'true') {
      // Redirect to adminCP
      this.router.navigate(['adminCP']);
    }

  }

  performAction(action) {

    if (action === 'orders') {
      this.router.navigate(['userorders']);
    } else if (action === 'details') {
      this.router.navigate(['useredit']);
    } else if (action === 'logout') {
      window.localStorage.setItem('adminLoggedIn', 'false');
      window.localStorage.setItem('loggedUser', '');
      // Send the user home, and reload the page.
      this.location.go('home');
      location.reload();
    }

  }

}
