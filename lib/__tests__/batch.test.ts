import { describe, it, expect } from "vitest";
import { sendBatchPayment } from "@/lib/stellar/batch";

describe("sendBatchPayment", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      sendBatchPayment({
        sourceSecret: "invalid",
        payments: [{ destinationPublicKey: "GABC1234567890123456789012345678901234567890123", amount: "10" }],
      }),
    ).rejects.toThrow();
  });
});
