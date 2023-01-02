import { Component } from '@angular/core';
import {
  FiatBalance,
  FiatCurrency,
  Payment,
  PaymentStatus,
  UserTransaction,
} from '../../models/payment';
import { HttpService } from '../../services/http.service';
import { forkJoin } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent {
  userPayments: Payment[] = [];
  userTransactions: UserTransaction[] = [];
  userBalance: FiatBalance[] = [];

  totalPaymentsNumber = 0;
  totalTransactionsNumber = 0;
  pendingPayments = 0;
  finishedPayments = 0;

  allFiatCurrencies: FiatCurrency[] = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private localStorageService: LocalStorageService
  ) {
    forkJoin([
      httpService.getAllUserPayments(),
      httpService.getAllUserTransactions(),
      httpService.getUserBalance(),
      httpService.getAllFiatCurrencies(),
    ]).subscribe({
      next: data => {
        this.userPayments = data[0];
        this.userTransactions = data[1];
        this.userBalance = data[2];
        this.allFiatCurrencies = data[3];

        this.totalPaymentsNumber = this.userPayments.length;
        this.totalTransactionsNumber = this.userTransactions.length;

        this.finishedPayments = this.userPayments.filter(
          p => p.status === PaymentStatus.Finished
        ).length;

        this.pendingPayments = this.totalPaymentsNumber - this.finishedPayments;
      },
    });
  }

  findFiatCurrencyById(id: number) {
    return this.allFiatCurrencies.filter(c => c.id === id)[0];
  }

  withdrawalBalance(fiatId: number, amount: number) {
    this.httpService
      .withdrawBalance({
        fiat_currency_id: fiatId,
        amount,
      })
      .subscribe({
        next: () => {
          console.log('success!');
        },
      });
  }

  onLogout() {
    this.localStorageService.removeJwt();
    this.router.navigate(['']);
  }
}
