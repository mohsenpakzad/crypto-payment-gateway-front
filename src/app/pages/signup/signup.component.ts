import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private httpService: HttpService, public router: Router) {
    this.signupForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  onSignup() {
    this.httpService.signup(this.signupForm.value).subscribe({
      next: () => {
        this.router.navigate(['dashboard']);
      },
      error: err => {
        console.log('Signup failed');
        console.log(err);
      },
    });
  }
}
