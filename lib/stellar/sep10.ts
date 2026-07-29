import { Keypair, TransactionBuilder, BASE_FEE, StrKey } from "@stellar/stellar-sdk";
import { getServer, getNetworkConfig, StellarNetwork } from "./network";

export interface Sep10AuthResult {
  token: string;
  clientAccountId: string;
}

export async function authenticateWithSep10(
  serverSigningKey: string,
  clientSecret: string,
  endpoint: string,
  network: StellarNetwork = "testnet",
): Promise<Sep10AuthResult> {
  const clientKeypair = Keypair.fromSecret(clientSecret);
  const serverKeypair = Keypair.fromSecret(serverSigningKey);
  const serverPublicKey = serverKeypair.publicKey();
  const { networkPassphrase } = getNetworkConfig(network);

  const response = await fetch(endpoint, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`SEP-10 challenge request failed: ${response.statusText}`);
  }

  const challengeJson = await response.json();
  const transactionXdr = challengeJson.transaction;

  const serverObj = getServer(network);
  const account = await serverObj.loadAccount(clientKeypair.publicKey());

  const challengeTx = TransactionBuilder.fromXDR(transactionXdr, networkPassphrase);

  challengeTx.sign(clientKeypair);

  const tokenResponse = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      transaction: challengeTx.toXDR(),
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`SEP-10 token request failed: ${tokenResponse.statusText}`);
  }

  const tokenJson = await tokenResponse.json();
  return {
    token: tokenJson.token,
    clientAccountId: clientKeypair.publicKey(),
  };
}
