import { describe, it, expect } from "vitest";
import { createRecoveryWallet, signWithRecovery } from "@/lib/stellar/recovery";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Recovery", () => {
  it("creates recovery wallet", () => {
    const result = createRecoveryWallet(
      generateKeypair().publicKey,
      [generateKeypair().publicKey, generateKeypair().publicKey],
    );
    expect(result).toBeDefined();
  });
});
