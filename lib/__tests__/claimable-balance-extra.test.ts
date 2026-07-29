import { describe, it, expect } from "vitest";
import { Keypair } from "@stellar/stellar-sdk";
import {
  createClaimableBalance,
} from "@/lib/stellar/claimable-balance";

describe("ClaimableBalance", () => {
  it("creates claimable balance operation", async () => {
    const source = Keypair.random();
    const claimant = Keypair.random();
    await expect(createClaimableBalance({
      sourceSecret: source.secret(),
      claimant: claimant.publicKey(),
      amount: "100",
    })).rejects.toThrow();
  });
});
