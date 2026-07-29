import { Keypair, TransactionBuilder, BASE_FEE, xdr } from "@stellar/stellar-sdk";
import { getServer, getNetworkConfig, StellarNetwork } from "./network";

export interface SorobanAuthParams {
  sourceSecret: string;
  contractId: string;
  network?: StellarNetwork;
}

export async function authenticateWithSoroban(
  params: SorobanAuthParams,
): Promise<string> {
  const { sourceSecret, contractId, network = "testnet" } = params;

  const sourceKeypair = Keypair.fromSecret(sourceSecret);
  const server = getServer(network);
  const { networkPassphrase } = getNetworkConfig(network);
  const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

  const tx = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE, networkPassphrase,
  })
    .setTimeout(30)
    .build();

  tx.sign(sourceKeypair);
  const result = await server.submitTransaction(tx);
  return result.hash;
}
