import { describe, it, expect } from "vitest";
import {
  createPaymentTransaction,
  signTransaction,
} from "@/lib/stellar/transactions";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Transaction integration", () => {
  it("creates payment transaction structure", () => {
    const source = generateKeypair();
    const dest = generateKeypair();
    const tx = createPaymentTransaction(
      source.publicKey,
      dest.publicKey,
      "100",
      "XLM",
      "testnet",
    );
    expect(tx).toBeDefined();
  });
});
