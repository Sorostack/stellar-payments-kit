import { describe, it, expect } from "vitest";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("edge cases", () => {
  it("handles multiple rapid key generations", () => {
    for (let i = 0; i < 10; i++) {
      const { publicKey, secretKey } = generateKeypair();
      expect(publicKey).toMatch(/^G/);
      expect(secretKey).toMatch(/^S/);
    }
  });
});
