import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import Account from '../Account';
import * as sha1 from 'js-sha1';

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
              private as: AccountService) {
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
      if (sha1(loginPassword) === account.accountPassword) {
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
    this.router.navigate(['home']);
  } else {
    window.alert('Incorrect login details, create an account or try again.');
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
