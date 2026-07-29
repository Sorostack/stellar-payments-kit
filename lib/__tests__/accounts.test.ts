import { describe, it, expect, vi } from "vitest";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("generateKeypair", () => {
  it("returns a public and secret key", () => {
    const { publicKey, secretKey } = generateKeypair();
    expect(publicKey).toMatch(/^G[A-Z0-9]{55}$/);
    expect(secretKey).toMatch(/^S[A-Z0-9]{55}$/);
  });

  it("generates unique keypairs each call", () => {
    const a = generateKeypair();
    const b = generateKeypair();
    expect(a.publicKey).not.toBe(b.publicKey);
    expect(a.secretKey).not.toBe(b.secretKey);
  });
});
