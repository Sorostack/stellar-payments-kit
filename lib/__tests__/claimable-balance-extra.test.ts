import { describe, it, expect } from "vitest";
import {
  createClaimableBalance,
  claimClaimableBalance,
} from "@/lib/stellar/claimable-balance";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("ClaimableBalance", () => {
  it("creates claimable balance operation", () => {
    const claimant = generateKeypair();
    const result = createClaimableBalance(
      generateKeypair().publicKey,
      "100",
      "USDC",
      generateKeypair().publicKey,
    );
    expect(result).toBeDefined();
  });
});
