import { Keypair } from "@stellar/stellar-sdk";
import {
  createAccount,
  getAccountInfo,
} from "../lib/stellar/accounts";

async function manageAccount() {
  const keypair = Keypair.random();

  const publicKey = await createAccount({
    sourceSecret: keypair.secret(),
    network: "testnet",
  });
  console.log("Account created:", publicKey);

  const info = await getAccountInfo(publicKey, "testnet");
  console.log("Account info:", info);
}

manageAccount().catch(console.error);
