import { describe, it, expect } from "vitest";
import { depositLiquidity, withdrawLiquidity } from "@/lib/stellar/liquidity-pool";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("LiquidityPool", () => {
  it("deposits liquidity", () => {
    const result = depositLiquidity(
      generateKeypair().publicKey,
      "100", "200",
      "XLM", "USDC",
    );
    expect(result).toBeDefined();
  });

  it("withdraws liquidity", () => {
    const result = withdrawLiquidity(
      generateKeypair().publicKey,
      "50",
    );
    expect(result).toBeDefined();
  });
});
