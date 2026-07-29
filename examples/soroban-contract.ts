import { Keypair } from "@stellar/stellar-sdk";
import { deployContract, invokeContract } from "../lib/stellar/soroban-contract";

async function contractExample() {
  const keypair = Keypair.random();
  const wasmHash = "abc123...";

  const contractId = await deployContract({
    sourceSecret: keypair.secret(),
    wasmHash,
    network: "testnet",
  });
  console.log("Contract deployed:", contractId);

  const result = await invokeContract({
    sourceSecret: keypair.secret(),
    contractId,
    method: "hello",
    args: ["world"],
    network: "testnet",
  });
  console.log("Contract result:", result);
}

contractExample().catch(console.error);
