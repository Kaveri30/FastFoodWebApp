import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import Account from '../Account';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {

  angForm: FormGroup;
  accounts: Account[];
  foundMatch: boolean;

  constructor(private fb: FormBuilder, private as: AccountService, private route: ActivatedRoute,
              private router: Router) {
      this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      accountLogin: ['', Validators.required ],
      accountEmail: ['', Validators.required ],
      accountPassword: ['', Validators.required ]
    });
  }

  addAccount(accountLogin, accountEmail, accountPassword) {
    // We need to check to see if the account already exists first.
    // Assuming no match to begin with
    this.foundMatch = false;

    // Loop through all accounts
    for (const account of this.accounts) {
      // Check the input accountLogin against all known accountLogins.
      if (accountLogin === account.accountLogin) {
        // If we find a match, set to true and break out of the loop.
        this.foundMatch = true;
        break;
      }
    }

    // If account already exists, alert the user.
    if (this.foundMatch === true) {
      window.alert('Username already exists, please try another!');
    } else {
      // Else, we add the account to the database.
      this.route.params.subscribe(params => {
        // Pass all of the data through the AccountService, encrypt the password using SHA-1.
        this.as.addAccount(accountLogin, sha1(accountPassword), accountEmail, false).subscribe((data:string) =>{
          // Redirect home after account creation.
          this.router.navigate(['home']);
        });
      });
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
    // Get list of accounts when component is loaded.
    this.getAccounts();
  }

}
