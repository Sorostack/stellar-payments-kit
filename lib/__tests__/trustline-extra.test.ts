import { describe, it, expect } from "vitest";
import { addTrustline, removeTrustline } from "@/lib/stellar/trustline";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Trustline", () => {
  it("adds trustline", () => {
    const result = addTrustline(
      "USDC",
      generateKeypair().publicKey,
      "1000000",
    );
    expect(result).toBeDefined();
  });

  it("removes trustline", () => {
    const result = removeTrustline(
      "USDC",
      generateKeypair().publicKey,
    );
    expect(result).toBeDefined();
  });
});
