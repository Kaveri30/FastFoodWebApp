import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-cp',
  templateUrl: './admin-cp.component.html',
  styleUrls: ['./admin-cp.component.css']
})
export class AdminCpComponent implements OnInit {

  adminLoggedIn = window.localStorage.getItem('adminLoggedIn');

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    // Need to check if admin, we don't want non-admins here.
    if (this.adminLoggedIn != 'true') {
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
      window.alert('You have successfully logged out!');
      this.router.navigate(['home']);
    }

  }

}
