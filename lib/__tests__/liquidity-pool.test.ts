import { describe, it, expect } from "vitest";
import { depositLiquidityPool } from "@/lib/stellar/liquidity-pool";

describe("depositLiquidityPool", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      depositLiquidityPool({
        sourceSecret: "invalid",
        assetA: { code: "USDC", issuer: "GABC" },
        assetB: { code: "XLM", issuer: "GABC" },
        depositAmountA: "100",
        depositAmountB: "50",
        minPrice: "1",
        maxPrice: "2",
      }),
    ).rejects.toThrow();
  });
});
