import { describe, it, expect } from "vitest";
import { PaymentStream } from "@/lib/stellar/payment-stream";

describe("PaymentStream", () => {
  it("creates stream with correct config", () => {
    const stream = new PaymentStream({
      sourceSecret: "SABC1234567890123456789012345678901234567890123",
      destinationPublicKey: "GABC1234567890123456789012345678901234567890123",
      totalAmount: "100",
      durationMs: 10000,
      intervalMs: 1000,
    });
    const progress = stream.getProgress();
    expect(progress.total).toBe("100");
    expect(progress.sent).toBe("0");
  });
});
