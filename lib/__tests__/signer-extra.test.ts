import { describe, it, expect } from "vitest";
import { addSigner, removeSigner } from "@/lib/stellar/signer";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Signer", () => {
  it("adds signer to account", () => {
    const result = addSigner(
      generateKeypair().publicKey,
      generateKeypair().publicKey,
      1,
    );
    expect(result).toBeDefined();
  });

  it("removes signer from account", () => {
    const result = removeSigner(
      generateKeypair().publicKey,
      generateKeypair().publicKey,
    );
    expect(result).toBeDefined();
  });
});
