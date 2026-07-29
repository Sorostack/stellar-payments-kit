import { Keypair } from "@stellar/stellar-sdk";
import { setMultisigSigners } from "../lib/stellar/multisig";
import { createAccount } from "../lib/stellar/accounts";

async function setupMultisig() {
  const owner = Keypair.random();
  const signer1 = Keypair.random();
  const signer2 = Keypair.random();

  await createAccount({
    sourceSecret: owner.secret(),
    network: "testnet",
  });

  const txHash = await setMultisigSigners({
    sourceSecret: owner.secret(),
    signers: [
      { key: signer1.publicKey(), weight: 1 },
      { key: signer2.publicKey(), weight: 1 },
    ],
    masterWeight: 1,
    thresholdLow: 2,
    thresholdMedium: 2,
    thresholdHigh: 2,
    network: "testnet",
  });
  console.log("Multisig configured:", txHash);
}

setupMultisig().catch(console.error);
