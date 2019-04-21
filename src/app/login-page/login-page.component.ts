import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  adminLoggedIn = window.localStorage.getItem('adminLoggedIn');

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
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
  // If the login is admin or Admin
  if (loginName === 'admin' || loginName === 'Admin') {
    // Then, if the password is password
    if (loginPassword === 'password') {
      // We set our adminLoggedIn local variable to true.
      window.localStorage.setItem('adminLoggedIn', 'true');
      // And direct the admin to the database controls.
      this.router.navigate(['adminCP']);
    }
  } else {
    // If the details are incorrect, we set the admin log in to false.
    window.localStorage.setItem('adminLoggedIn', 'false');
    // Then we notify the user that the login details are incorrect.
    window.alert('Incorrect login details');
  }

}

ngOnInit() {
  // Check if we're logged in or not
  if (this.adminLoggedIn === 'true') {
    // If we are, redirect to the admin control panel.
    this.router.navigate(['adminCP']);
  }
}

}
