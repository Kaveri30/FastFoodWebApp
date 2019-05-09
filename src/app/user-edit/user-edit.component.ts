import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { sha3_256 } from 'js-sha3';
import Account from '../Account';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  angForm: FormGroup;
  editType = window.localStorage.getItem('editType');
  loggedUser = window.localStorage.getItem('loggedUser');
  accounts: Account[] = new Array();
  currAccount: Account;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private as: AccountService) {

  }

  ngOnInit() {
    // Get the account.
    this.updateAccount();
    // Then create the form.
    this.createForm();
  }

  createForm() {
      this.angForm = this.fb.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      });
    }

  changeData(dataType: string) {
    // First we need to get the button.
    const passwordLabel: HTMLLabelElement = document.getElementById('passwordLabel') as HTMLLabelElement;
    const emailLabel: HTMLLabelElement = document.getElementById('emailLabel') as HTMLLabelElement;

    // Then we want to determine which button was pressed.
    if (dataType === 'password') {
      // First we need to change which button is active.
      passwordLabel.classList.add('active');
      emailLabel.classList.remove('active');
      // We set the databaseDisplayData
      window.localStorage.setItem('editType', 'password');
      // Then get the type again.
      this.editType = window.localStorage.getItem('editType');
    } else if (dataType === 'email') {
      // First we need to change which button is active.
      passwordLabel.classList.remove('active');
      emailLabel.classList.add('active');
      // We set the databaseDisplayData
      window.localStorage.setItem('editType', 'email');
      // Then get the type again.
      this.editType = window.localStorage.getItem('editType');
    }
  }

  getCurrentAccount() {
    // Loop through all accounts.
    for (const account of this.accounts) {
      // If our logged in user is found in the accounts.
      if (this.loggedUser === account.accountLogin) {
        // Set the currAccount object to be this users account.
        this.currAccount = account;
        // Break out of the loop because we do not need to look any
        break;
      }
    }
  }

  updatePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    // First we need to check if the old password is correct.
    // Need to encrypt the input password as the stored passwords are all encrypted.
    if (sha3_256(currentPassword) === this.currAccount.accountPassword) {
      // Then we need to check to see if the new + confirm passwords are the same.
      if (newPassword === confirmPassword) {
        this.route.params.subscribe(params => {
        // If they are, we can then update to the new password.
        this.as.updateAccount(this.currAccount.accountLogin, sha3_256(newPassword),
                              this.currAccount.accountEmail, this.currAccount.isAdmin, this.currAccount._id).subscribe((data: string) => {
          // After setting the new password, we need to update the account to the new details.
          this.updateAccount();
          $('#passwordSuccess').fadeIn(200);
          // Then, 3000ms later, hide the alert + fade the button in.
          setTimeout(() => {
            $('#passwordSuccess').fadeOut(200);
          }, 3000);
          // Clears the users focus.
          (document.activeElement as HTMLElement).blur();
          // Recreate form, essentially resets it.
          this.createForm();
          });
        });
      } else {
        $('#passwordNoMatch').fadeIn(200);
        // Then, 3000ms later, hide the alert + fade the button in.
        setTimeout(() => {
          $('#passwordNoMatch').fadeOut(200);
        }, 3000);
      }
    } else {
      $('#incorrectPassword').fadeIn(200);
      // Then, 3000ms later, hide the alert + fade the button in.
      setTimeout(() => {
        $('#incorrectPassword').fadeOut(200);
      }, 3000);
    }
  }

  updateAccount() {
    // Get the user accounts.
    this.as.getAccounts().subscribe((data: Account[]) => {
      this.accounts = data;
      // Get the specific logged user account.
      this.getCurrentAccount();
    });
  }
}
