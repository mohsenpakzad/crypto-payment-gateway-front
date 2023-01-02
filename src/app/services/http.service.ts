import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { LoginUser, SignupUser } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class HttpService {
  readonly BASE_URL = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public signup(signupUser: SignupUser) {
    return this.http
      .post(`${this.BASE_URL}/signup`, signupUser)
      .pipe(tap(body => this.localStorageService.setJwt(body as string)));
  }

  public login(loginUser: LoginUser) {
    return this.http
      .post(`${this.BASE_URL}/login`, loginUser)
      .pipe(tap(body => this.localStorageService.setJwt(body as string)));
  }
}
