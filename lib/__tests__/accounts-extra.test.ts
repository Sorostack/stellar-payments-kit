import { describe, it, expect } from "vitest";
import { Keypair } from "@stellar/stellar-sdk";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("generateKeypair", () => {
  it("generates valid keypair", () => {
    const { publicKey, secretKey } = generateKeypair();
    expect(publicKey).toMatch(/^G/);
    expect(publicKey.length).toBe(56);
    expect(secretKey).toMatch(/^S/);
    expect(secretKey.length).toBe(56);
  });

  it("generates unique keypairs", () => {
    const kp1 = generateKeypair();
    const kp2 = generateKeypair();
    expect(kp1.publicKey).not.toBe(kp2.publicKey);
  });
});

describe("Keypair integration", () => {
  it("creates keypair from secret", () => {
    const { secretKey } = generateKeypair();
    const restored = Keypair.fromSecret(secretKey);
    expect(restored.publicKey()).toMatch(/^G/);
  });
});
