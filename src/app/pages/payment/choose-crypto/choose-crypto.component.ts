import { Component } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { CryptoCurrency, Network } from '../../../models/payment';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-choose-crypto',
  templateUrl: './choose-crypto.component.html',
  styleUrls: ['./choose-crypto.component.scss'],
})
export class ChooseCryptoComponent {
  allNetworks: Network[] = [];
  allCryptoCurrencies: CryptoCurrency[] = [];
  selectedCrypto: CryptoCurrency | null = null;

  cryptoTableCols = [
    { field: 'name', header: 'Name' },
    { field: 'symbol', header: 'Symbol' },
    { field: 'network_id', header: 'Network' },
  ];

  constructor(
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    httpService
      .isPaymentPayable(route.parent?.snapshot.params['id'])
      .subscribe({
        error: err => {
          if (err.status !== 400) {
            router.navigate(['../result'], {
              relativeTo: route,
              queryParams: {
                status: 'Failed',
                reason: 'Payment is not payable',
              },
            });
          }
        },
      });

    forkJoin([
      httpService.getAllNetworks(),
      httpService.getAllCryptoCurrencies(),
    ]).subscribe({
      next: data => {
        this.allNetworks = data[0];
        this.allCryptoCurrencies = data[1];
      },
    });
  }

  findNetworkById(id: number) {
    return this.allNetworks.filter(n => n.id === id)[0];
  }

  selectCrypto() {
    this.router.navigate(['../sub-transactions', this.selectedCrypto?.id], {
      relativeTo: this.route,
    });
  }
}
