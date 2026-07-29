import { Keypair } from "@stellar/stellar-sdk";
import { createLiquidityPool } from "../lib/stellar/liquidity-pool";
import { createAccount } from "../lib/stellar/accounts";

async function poolExample() {
  const keypair = Keypair.random();

  await createAccount({
    sourceSecret: keypair.secret(),
    network: "testnet",
  });

  const poolId = await createLiquidityPool({
    sourceSecret: keypair.secret(),
    assetA: { code: "USDC", issuer: "GA...issuer" },
    assetB: { code: "XLM", issuer: "" },
    depositA: "100",
    depositB: "500",
    network: "testnet",
  });
  console.log("Liquidity pool created:", poolId);
}

poolExample().catch(console.error);
