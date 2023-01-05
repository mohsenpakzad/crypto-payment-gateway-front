export enum WsInputMessage {
  ChooseCrypto = '/CHOOSE_CRYPTO',
}

export enum WsOutputMessage {
  Error = 'ERROR',
  PaymentUpdated = 'PAYMENT_UPDATED',
  PaymentDone = 'PAYMENT_DONE',
  PaymentExpired = 'PAYMENT_EXPIRED',
  TransactionReceived = 'TRANSACTION_RECEIVED',
}
