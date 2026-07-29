import { describe, it, expect } from "vitest";
import { createPaymentStream, cancelPaymentStream } from "@/lib/stellar/payment-stream";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("PaymentStream", () => {
  it("creates payment stream", () => {
    const result = createPaymentStream(
      generateKeypair().publicKey,
      generateKeypair().publicKey,
      "100",
      Date.now() + 86400000,
    );
    expect(result).toBeDefined();
  });

  it("cancels payment stream", () => {
    expect(() => cancelPaymentStream(1)).not.toThrow();
  });
});
