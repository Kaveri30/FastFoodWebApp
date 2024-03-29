import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import Account from '../Account';
import { sha3_256 } from 'js-sha3';
import * as $ from 'jquery';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  accounts: Account[];
  haveLoggedIn: boolean;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private as: AccountService, private location: Location) {
    this.createForm();
  }

createForm() {
  this.loginForm = this.fb.group({
    loginName: ['', Validators.required ],
    loginPassword: ['', Validators.required ],
  });
}

// This is the login logic for the admin control panel.
doLogin(loginName, loginPassword) {
  // We assume no login to begin with.
  this.haveLoggedIn = false;

  // Loop through all accounts
  for (const account of this.accounts) {
    // Check the input accountLogin against all known accountLogins.
    if (loginName === account.accountLogin) {
      // If we find a match, check password.
      // We have to put the password through a SHA-1 hash as that's how the passwords are stored.
      if (sha3_256(loginPassword) === account.accountPassword) {
        // We set the logged in users name and whether they have admin rights.
        window.localStorage.setItem('loggedUser', account.accountLogin);
        window.localStorage.setItem('adminLoggedIn', '' + account.isAdmin);
        // Then we set whether we have logged in or not.
        this.haveLoggedIn = true;
      } else {
        this.haveLoggedIn = false;
      }
    }
  }

  if (this.haveLoggedIn) {
    console.log(this.haveLoggedIn);
    // Need to set to false for next time we want to log in.
    this.haveLoggedIn = false;
    // Send the user home, and reload the page.
    this.location.go('home');
    location.reload();
  } else {
    $('#incorrectPassword').fadeIn(200);
    // Then, 5000ms later, hide the alert + fade the button in.
    setTimeout(() => {
      $('#incorrectPassword').fadeOut(200);
    }, 5000);
  }
}

// Get accounts from database, needed to check for existing accounts.
getAccounts() {
  // Get the accounts, using the AccountService.
  this.as.getAccounts().subscribe((data: Account[]) => {
      this.accounts = data;
  });
}

ngOnInit() {
  // Get accounts on initialisation.
  this.getAccounts();
}

}
