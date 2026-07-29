import { describe, it, expect } from "vitest";
import { isValidPublicKey, isValidSecretKey, isValidAmount } from "@/lib/stellar/validation";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Validation integration", () => {
  it("validates a real generated key", () => {
    const { publicKey } = generateKeypair();
    expect(isValidPublicKey(publicKey)).toBe(true);
  });

  it("validates a real generated secret", () => {
    const { secretKey } = generateKeypair();
    expect(isValidSecretKey(secretKey)).toBe(true);
  });

  it("validates amounts", () => {
    expect(isValidAmount("100")).toBe(true);
    expect(isValidAmount("0.0000001")).toBe(true);
    expect(isValidAmount("-1")).toBe(false);
  });
});
