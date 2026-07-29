import { describe, it, expect } from "vitest";
import { sendTimeLockedPayment } from "@/lib/stellar/time-lock";

describe("sendTimeLockedPayment", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      sendTimeLockedPayment({
        sourceSecret: "bad",
        destinationPublicKey: "GABC1234567890123456789012345678901234567890123",
        amount: "10",
        unlockAt: new Date(Date.now() + 3600000),
      }),
    ).rejects.toThrow();
  });
});
