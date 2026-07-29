#!/usr/bin/env node

import { generateKeypair } from "../lib/stellar/accounts.mjs";
import { sendPathPayment } from "../lib/stellar/path-payment.mjs";

async function main() {
  const source = generateKeypair();
  const dest = generateKeypair();

  console.log("Source:", source.publicKey);

  try {
    const result = await sendPathPayment({
      sourceSecret: source.secretKey,
      destinationPublicKey: dest.publicKey,
      sendAsset: { code: "USDC", issuer: "GB..." },
      sendAmount: "5",
      destAsset: { code: "XLM", issuer: "" },
      destMinAmount: "10",
      network: "testnet",
    });
    console.log("Path payment sent:", result.hash);
  } catch (err) {
    console.log("Note: Expected to fail without funded accounts.");
  }
}

main();
