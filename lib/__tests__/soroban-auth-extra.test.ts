import { describe, it, expect } from "vitest";
import { authenticateSoroban } from "@/lib/stellar/soroban-auth";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("SorobanAuth", () => {
  it("creates auth signature", () => {
    const { secretKey, publicKey } = generateKeypair();
    const result = authenticateSoroban(secretKey, "CA123");
    expect(result).toBeDefined();
  });
});
