import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { LoginUser, SignupUser } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import {
  CryptoCurrency,
  FiatBalance,
  FiatCurrency,
  Network,
  Payment,
  UserTransaction,
  Wallet,
  WithdrawalBalance,
} from '../models/payment';

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

  public getAllUserPayments(): Observable<Payment[]> {
    return this.http.get(`${this.BASE_URL}/api/users/payments`) as Observable<
      Payment[]
    >;
  }

  public getAllUserTransactions() {
    return this.http.get(
      `${this.BASE_URL}/api/users/transactions`
    ) as Observable<UserTransaction[]>;
  }

  public getUserBalance() {
    return this.http.get(`${this.BASE_URL}/api/users/balance`) as Observable<
      FiatBalance[]
    >;
  }

  public withdrawBalance(withdrawalBalance: WithdrawalBalance) {
    return this.http.post(
      `${this.BASE_URL}/api/users/withdraw`,
      withdrawalBalance
    );
  }

  public getAllNetworks() {
    return this.http.get(`${this.BASE_URL}/api/networks`) as Observable<
      Network[]
    >;
  }

  public getAllCryptoCurrencies() {
    return this.http.get(
      `${this.BASE_URL}/api/crypto-currencies`
    ) as Observable<CryptoCurrency[]>;
  }

  public getAllWallets() {
    return this.http.get(`${this.BASE_URL}/api/wallets`) as Observable<
      Wallet[]
    >;
  }

  public getAllFiatCurrencies() {
    return this.http.get(`${this.BASE_URL}/api/fiat-currencies`) as Observable<
      FiatCurrency[]
    >;
  }
}
