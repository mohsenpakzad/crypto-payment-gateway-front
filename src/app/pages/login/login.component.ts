import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private httpService: HttpService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  onLogin() {
    this.httpService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['dashboard']);
      },
      error: err => {
        console.log('Login failed');
        console.log(err);
      },
    });
  }
}
