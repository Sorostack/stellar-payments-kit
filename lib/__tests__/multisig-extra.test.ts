import { describe, it, expect } from "vitest";
import { createMultisigAccount } from "@/lib/stellar/multisig";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Multisig", () => {
  it("creates multisig account", () => {
    const signer1 = generateKeypair();
    const signer2 = generateKeypair();
    const result = createMultisigAccount(
      generateKeypair().publicKey,
      [signer1.publicKey, signer2.publicKey],
      2,
    );
    expect(result).toBeDefined();
  });
});
