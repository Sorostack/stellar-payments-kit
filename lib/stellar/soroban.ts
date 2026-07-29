import {
  Keypair,
  TransactionBuilder,
  BASE_FEE,
} from "@stellar/stellar-sdk";
import { getServer, getNetworkConfig, StellarNetwork } from "./network";

export interface SorobanInvokeParams {
  sourceSecret: string;
  contractId: string;
  functionName: string;
  args: string[];
  network?: StellarNetwork;
}

export async function invokeSorobanContract(
  params: SorobanInvokeParams,
): Promise<string> {
  const { sourceSecret, network = "testnet" } = params;

  const sourceKeypair = Keypair.fromSecret(sourceSecret);
  const server = getServer(network);
  const { networkPassphrase } = getNetworkConfig(network);

  const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

  const transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase,
  })
    .setTimeout(30)
    .build();

  transaction.sign(sourceKeypair);

  const result = await server.submitTransaction(transaction);

  return result.hash;
}
