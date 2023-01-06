import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-test',
  templateUrl: './seller-sim.component.html',
  styleUrls: ['./seller-sim.component.scss'],
})
export class SellerSimComponent {
  status: string;
  reason: string;
  paymentId: string;
  sellerOrderId: string;

  constructor(route: ActivatedRoute) {
    this.status = route.snapshot.queryParamMap.get('status') ?? 'None';
    this.reason = route.snapshot.queryParamMap.get('reason') ?? 'None';
    this.paymentId = route.snapshot.queryParamMap.get('id') ?? 'None';
    this.sellerOrderId =
      route.snapshot.queryParamMap.get('sellerOrderId') ?? 'None';
  }
}
