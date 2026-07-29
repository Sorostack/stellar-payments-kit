import { describe, it, expect } from "vitest";
import { generateKeypair } from "@/lib/stellar/accounts";
import { createEscrowAccount, releaseEscrow } from "@/lib/stellar/escrow-account";

describe("EscrowAccount", () => {
  it("creates escrow account", () => {
    const result = createEscrowAccount(
      generateKeypair().publicKey,
      generateKeypair().publicKey,
      Date.now() + 86400000,
    );
    expect(result).toBeDefined();
  });

  it("releases escrow funds", () => {
    const result = releaseEscrow(
      generateKeypair().publicKey,
      generateKeypair().publicKey,
    );
    expect(result).toBeDefined();
  });
});
