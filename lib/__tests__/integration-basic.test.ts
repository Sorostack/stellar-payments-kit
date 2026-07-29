import { describe, it, expect } from "vitest";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Integration", () => {
  it("generates valid keypair", () => {
    const { publicKey, secretKey } = generateKeypair();
    expect(publicKey.startsWith("G")).toBe(true);
    expect(publicKey.length).toBe(56);
    expect(secretKey.startsWith("S")).toBe(true);
    expect(secretKey.length).toBe(56);
  });
});
