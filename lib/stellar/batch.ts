import {
  Keypair,
  TransactionBuilder,
  Operation,
  Asset,
  BASE_FEE,
  Memo,
} from "@stellar/stellar-sdk";
import { getServer, getNetworkConfig, StellarNetwork } from "./network";

export interface BatchPayment {
  destinationPublicKey: string;
  amount: string;
  memo?: string;
}

export interface BatchPaymentParams {
  sourceSecret: string;
  payments: BatchPayment[];
  assetCode?: string;
  assetIssuer?: string;
  network?: StellarNetwork;
}

export interface BatchPaymentResult {
  hash: string;
  ledger: number;
  paymentCount: number;
}

export async function sendBatchPayment(
  params: BatchPaymentParams,
): Promise<BatchPaymentResult> {
  const {
    sourceSecret,
    payments,
    assetCode,
    assetIssuer,
    network = "testnet",
  } = params;

  const sourceKeypair = Keypair.fromSecret(sourceSecret);
  const server = getServer(network);
  const { networkPassphrase } = getNetworkConfig(network);

  const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

  const asset = assetCode && assetIssuer
    ? new Asset(assetCode, assetIssuer)
    : Asset.native();

  const builder = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase,
  });

  for (const payment of payments) {
    builder.addOperation(
      Operation.payment({
        destination: payment.destinationPublicKey,
        asset,
        amount: payment.amount,
      }),
    );
    if (payment.memo) {
      builder.addMemo(Memo.text(payment.memo));
    }
  }

  const transaction = builder.setTimeout(30).build();
  transaction.sign(sourceKeypair);

  const result = await server.submitTransaction(transaction);

  return {
    hash: result.hash,
    ledger: result.ledger,
    paymentCount: payments.length,
  };
}
