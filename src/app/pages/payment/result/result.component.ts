import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../../models/payment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  status: string;
  payment: Payment | null = null;
  reason: string | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute
  ) {
    this.status = route.snapshot.queryParamMap.get('status') ?? '';
    this.reason = route.snapshot.queryParamMap.get('reason');
    const payment = route.snapshot.queryParamMap.get('payment');
    if (payment) {
      this.payment = JSON.parse(payment);
    }

    setTimeout(() => {
      this.goToUrl();
    }, 4000);
  }

  goToUrl(): void {
    let redirectUrl = `${this.payment?.callback_url}?status=${this.status}`;
    if (this.reason) {
      redirectUrl = `${redirectUrl}&reason=${this.reason}`;
    } else if (this.payment) {
      redirectUrl = `${redirectUrl}&id=${this.payment.id}&sellerOrderId=${this.payment.seller_order_id}`;
    }
    this.document.location.href = redirectUrl;
  }
}
