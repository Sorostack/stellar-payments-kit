import { Keypair, TransactionBuilder, Operation, Asset, BASE_FEE } from "@stellar/stellar-sdk";
import { getServer, getNetworkConfig, StellarNetwork } from "./network";

export async function changeTrust(
  sourceSecret: string,
  assetCode: string,
  assetIssuer: string,
  limit?: string,
  network: StellarNetwork = "testnet",
): Promise<string> {
  const keypair = Keypair.fromSecret(sourceSecret);
  const server = getServer(network);
  const { networkPassphrase } = getNetworkConfig(network);
  const account = await server.loadAccount(keypair.publicKey());
  const asset = new Asset(assetCode, assetIssuer);

  const tx = new TransactionBuilder(account, { fee: BASE_FEE, networkPassphrase })
    .addOperation(Operation.changeTrust({ asset, limit }))
    .setTimeout(30)
    .build();

  tx.sign(keypair);
  const result = await server.submitTransaction(tx);
  return result.hash;
}

export async function deleteTrustline(
  sourceSecret: string,
  assetCode: string,
  assetIssuer: string,
  network: StellarNetwork = "testnet",
): Promise<string> {
  return changeTrust(sourceSecret, assetCode, assetIssuer, "0", network);
}
