import { Keypair } from "@stellar/stellar-sdk";
import { createPayment } from "../lib/stellar/transactions";
import { getServer } from "../lib/stellar/network";

async function basicPayment() {
  const sender = Keypair.random();
  const receiver = Keypair.random();

  const result = await createPayment({
    sourceSecret: sender.secret(),
    destination: receiver.publicKey(),
    amount: "100",
    network: "testnet",
  });

  console.log("Payment sent:", result);
}

basicPayment().catch(console.error);
