import { Keypair } from "@stellar/stellar-sdk";
import { stake, claimRewards, unstake } from "../lib/stellar/staking";

async function stakingExample() {
  const keypair = Keypair.random();

  const stakeTx = await stake({
    sourceSecret: keypair.secret(),
    amount: "1000",
    poolId: "POOL...id",
    network: "testnet",
  });
  console.log("Staked:", stakeTx);

  const claimTx = await claimRewards({
    sourceSecret: keypair.secret(),
    poolId: "POOL...id",
    network: "testnet",
  });
  console.log("Rewards claimed:", claimTx);

  const unstakeTx = await unstake({
    sourceSecret: keypair.secret(),
    amount: "500",
    poolId: "POOL...id",
    network: "testnet",
  });
  console.log("Unstaked:", unstakeTx);
}

stakingExample().catch(console.error);
