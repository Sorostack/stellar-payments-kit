import { describe, it, expect } from "vitest";
import { createPathPayment } from "@/lib/stellar/path-payment";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("PathPayment", () => {
  it("creates path payment with single hop", () => {
    const result = createPathPayment(
      generateKeypair().publicKey,
      "100",
      "USDC",
      generateKeypair().publicKey,
      ["XLM"],
    );
    expect(result).toBeDefined();
  });
});
