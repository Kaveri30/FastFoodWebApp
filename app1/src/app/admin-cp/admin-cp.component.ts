import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-cp',
  templateUrl: './admin-cp.component.html',
  styleUrls: ['./admin-cp.component.css']
})
export class AdminCpComponent implements OnInit {

  adminLoggedIn = window.localStorage.getItem('adminLoggedIn');

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {

  }

  ngOnInit() {
    // Need to check if admin, we don't want non-admins here.
    if (this.adminLoggedIn !== 'true') {
      window.alert('You are not an admin!');
      this.router.navigate(['home']);
    }

  }

  performAction(action) {

    if (action === 'add') {
      this.router.navigate(['database/create']);
    } else if (action === 'view') {
      this.router.navigate(['database']);
    } else if (action === 'logout') {
      window.localStorage.setItem('adminLoggedIn', 'false');
      window.localStorage.setItem('loggedUser', '');
      // Send the user home, and reload the page.
      this.location.go('home');
      location.reload();
    } else if (action === 'password') {
      // Set the editType for the edit page.
      window.localStorage.setItem('editType', 'password');
      // Redirect to the account edit page.
      this.router.navigate(['useredit']);
    } else if (action === 'email') {
      // Set the editType for the edit page.
      window.localStorage.setItem('editType', 'email');
      // Redirect to the account edit page.
      this.router.navigate(['useredit']);
    }

  }

}
