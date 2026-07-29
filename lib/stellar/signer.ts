import { Keypair, TransactionBuilder, Operation, BASE_FEE } from "@stellar/stellar-sdk";
import { getServer, getNetworkConfig, StellarNetwork } from "./network";

export async function addEd25519Signer(
  sourceSecret: string,
  signerKey: string,
  weight: number,
  network?: StellarNetwork,
): Promise<string> {
  return manageSigner(sourceSecret, { ed25519PublicKey: signerKey, weight }, network);
}

export async function removeEd25519Signer(
  sourceSecret: string,
  signerKey: string,
  network?: StellarNetwork,
): Promise<string> {
  return manageSigner(sourceSecret, { ed25519PublicKey: signerKey, weight: 0 }, network);
}

export async function addHashSigner(
  sourceSecret: string,
  hash: string,
  weight: number,
  network?: StellarNetwork,
): Promise<string> {
  return manageSigner(sourceSecret, { sha256Hash: hash, weight }, network);
}

export async function addPreAuthSigner(
  sourceSecret: string,
  hash: string,
  weight: number,
  network?: StellarNetwork,
): Promise<string> {
  return manageSigner(sourceSecret, { preAuthTx: hash, weight }, network);
}

async function manageSigner(
  sourceSecret: string,
  signer: Record<string, any>,
  network: StellarNetwork = "testnet",
): Promise<string> {
  const keypair = Keypair.fromSecret(sourceSecret);
  const server = getServer(network);
  const { networkPassphrase } = getNetworkConfig(network);
  const account = await server.loadAccount(keypair.publicKey());

  const tx = new TransactionBuilder(account, { fee: BASE_FEE, networkPassphrase })
    .addOperation(Operation.setOptions({ signer } as any))
    .setTimeout(30)
    .build();

  tx.sign(keypair);
  const result = await server.submitTransaction(tx);
  return result.hash;
}
