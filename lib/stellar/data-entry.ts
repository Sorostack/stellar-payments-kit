import { Keypair, TransactionBuilder, Operation, BASE_FEE } from "@stellar/stellar-sdk";
import { getServer, getNetworkConfig, StellarNetwork } from "./network";

export async function setDataEntry(
  sourceSecret: string,
  name: string,
  value: string,
  network: StellarNetwork = "testnet",
): Promise<string> {
  const keypair = Keypair.fromSecret(sourceSecret);
  const server = getServer(network);
  const { networkPassphrase } = getNetworkConfig(network);
  const account = await server.loadAccount(keypair.publicKey());

  const tx = new TransactionBuilder(account, { fee: BASE_FEE, networkPassphrase })
    .addOperation(Operation.manageData({ name, value }))
    .setTimeout(30)
    .build();

  tx.sign(keypair);
  const result = await server.submitTransaction(tx);
  return result.hash;
}

export async function clearDataEntry(
  sourceSecret: string,
  name: string,
  network: StellarNetwork = "testnet",
): Promise<string> {
  const keypair = Keypair.fromSecret(sourceSecret);
  const server = getServer(network);
  const { networkPassphrase } = getNetworkConfig(network);
  const account = await server.loadAccount(keypair.publicKey());

  const tx = new TransactionBuilder(account, { fee: BASE_FEE, networkPassphrase })
    .addOperation(Operation.manageData({ name }))
    .setTimeout(30)
    .build();

  tx.sign(keypair);
  const result = await server.submitTransaction(tx);
  return result.hash;
}
