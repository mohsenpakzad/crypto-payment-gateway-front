import { Component } from '@angular/core';
import {
  CryptoCurrency,
  CryptoTransaction,
  Payment,
  Wallet,
} from '../../../models/payment';
import { ActivatedRoute, Router } from '@angular/router';
import { WsInputMessage, WsOutputMessage } from '../../../models/ws';
import { HttpService } from '../../../services/http.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sub-transactions',
  templateUrl: './sub-transactions.component.html',
  styleUrls: ['./sub-transactions.component.scss'],
})
export class SubTransactionsComponent {
  readonly BASE_WS_URL = 'ws://localhost:8080/ws';
  websocket: WebSocket | null = null;

  isPaymentDone = false;

  paymentId: number;
  paymentCryptoId: number;
  paymentCrypto: CryptoCurrency | null = null;
  payment: Payment | null = null;

  allWallets: Wallet[] = [];

  cryptoAmount: number | null = null;
  walletAddress: string | null = null;

  transactions: CryptoTransaction[] = [];
  transactionsTableCols = [
    { field: 'hash', header: 'Hash' },
    { field: 'from', header: 'From Address' },
    { field: 'value', header: 'Value' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.paymentId = this.route.parent!.snapshot.params['id'];
    this.paymentCryptoId = this.route.snapshot.params['cryptoId'];

    forkJoin([
      httpService.getAllWallets(),
      httpService.getAllCryptoCurrencies(),
    ]).subscribe({
      next: data => {
        this.allWallets = data[0];
        this.paymentCrypto = data[1].filter(
          c => c.id == this.paymentCryptoId
        )[0];

        this.initSocket();
      },
    });
  }

  initSocket() {
    try {
      this.websocket = new WebSocket(
        `${this.BASE_WS_URL}/payments/${this.paymentId}`
      );
    } catch (e) {
      this.router.navigate(['../result'], {
        relativeTo: this.route,
        queryParams: {
          status: 'Failed',
          reason: 'Cannot connect to websocket',
        },
      });
      return;
    }

    this.websocket.onerror = (e: unknown) => {
      console.log('Socket error');
      console.log(e);
    };

    this.websocket.onopen = () => {
      console.log('Connected to websocket');
      this.chooseCrypto(this.paymentCryptoId);
    };

    this.websocket.onmessage = msg => {
      const message = msg.data.split(/ (.*)/);
      const command = message[0] as WsOutputMessage;

      switch (command) {
        case WsOutputMessage.PaymentUpdated: {
          this.payment = JSON.parse(message[1]) as Payment;
          console.log(this.payment);

          this.cryptoAmount = this.payment.crypto_amount;
          this.walletAddress = this.getWalletById(
            this.payment.dest_wallet_id!
          ).address;

          break;
        }

        case WsOutputMessage.PaymentDone: {
          this.payment = JSON.parse(message[1]) as Payment;
          console.log(this.payment);
          console.log('Payment done!');

          console.log('Closing socket');
          this.websocket?.close();

          this.isPaymentDone = true;

          break;
        }

        case WsOutputMessage.PaymentExpired: {
          this.payment = JSON.parse(message[1]) as Payment;
          console.log(this.payment);
          console.log('Payment expired');

          this.router.navigate(['../../result'], {
            relativeTo: this.route,
            queryParams: {
              status: 'Failed',
              reason: 'Payment expired',
            },
          });
          break;
        }

        case WsOutputMessage.TransactionReceived: {
          const transaction = JSON.parse(message[1]) as CryptoTransaction;
          console.log('transaction');
          console.log(transaction);

          this.transactions.push(transaction);
          this.cryptoAmount! -= this.convertWeiToEth(transaction.value);

          break;
        }
      }
    };

    this.websocket.onclose = (e: any) => {
      console.log('Socket closed');
      console.log(e);
    };
  }

  chooseCrypto(id: number) {
    console.log(`${WsInputMessage.ChooseCrypto} ${id}`);
    this.websocket?.send(`${WsInputMessage.ChooseCrypto} ${id}`);
  }

  getWalletById(id: number): Wallet {
    return this.allWallets?.filter(w => w.id === id)[0];
  }

  convertWeiToEth(wei: number): number {
    return wei / 10 ** 18;
  }

  completeTransaction() {
    this.router.navigate(['../../result'], {
      relativeTo: this.route,
      queryParams: {
        status: 'Done',
        payment: JSON.stringify(this.payment),
      },
    });
  }
}
