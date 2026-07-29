#!/usr/bin/env node

import { generateKeypair, fundTestnetAccount } from "../lib/stellar/accounts.mjs";

async function main() {
  console.log("Generating new Stellar keypair...");
  const { publicKey, secretKey } = generateKeypair();
  console.log("Public Key:", publicKey);
  console.log("Secret Key:", secretKey);

  console.log("\nFunding account on Testnet via Friendbot...");
  try {
    await fundTestnetAccount(publicKey);
    console.log("Account funded successfully!");
  } catch (error) {
    console.error("Funding failed:", error.message);
    process.exit(1);
  }
}

main();
