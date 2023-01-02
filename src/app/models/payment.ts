export interface Payment {
  user_id: number;
  fiat_currency_id: number;
  amount: number;
  callback_url: string;
  seller_order_id: string;
  description?: string;
  payer_name?: string;
  payer_phone?: string;
  payer_mail?: string;
  status: PaymentStatus;
  crypto_currency_id?: number;
  crypto_amount?: number;
  dest_wallet_id?: number;
  created_at: string;
  expired_at: string;
  done_at?: string;
  verified_at?: string;
}

export enum PaymentStatus {
  Waiting = 'Waiting',
  Done = 'Done',
  Verified = 'Verified',
  Finished = 'Finished',
  Expired = 'Expired',
}

export interface UserTransaction {
  id: number;
  user_id: number;
  type: UserTransactionType;
  amount: number;
  fiat_currency_id: number;
  created_at: string;
  deposit_payment_id?: number;
}

export enum UserTransactionType {
  Deposit = 'DEPOSIT',
  Withdrawal = 'WITHDRAWAL',
}

export interface FiatBalance {
  fiat_currency_id: number;
  balance: number;
  withdrawal_amount?: number;
}

export interface Network {
  id: number;
  name: string;
}

export interface CryptoCurrency {
  id: number;
  name: string;
  symbol: string;
  network_id: number;
}

export enum WalletStatus {
  Free = 'FREE',
  Busy = 'BUSY',
}

export interface Wallet {
  id: number;
  address: string;
  network_id: number;
  status: WalletStatus;
}

export interface FiatCurrency {
  id: number;
  name: string;
  symbol: string;
}

export interface WithdrawalBalance {
  fiat_currency_id: number;
  amount: number;
}
