import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  paymentId: number;
  routeItems: MenuItem[] = [];

  constructor(private route: ActivatedRoute) {
    this.paymentId = route.snapshot.params['id'];
    this.routeItems = [
      { label: 'Choose Crypto', routerLink: 'choose-crypto' },
      { label: 'Subscribing Transactions ', routerLink: 'sub-transactions' },
      { label: 'Result', routerLink: 'result' },
    ];
  }
}
