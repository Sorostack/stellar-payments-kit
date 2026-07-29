import { describe, it, expect } from "vitest";
import { sendPathPayment } from "@/lib/stellar/path-payment";

describe("sendPathPayment", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      sendPathPayment({
        sourceSecret: "invalid",
        destinationPublicKey: "GABC1234567890123456789012345678901234567890123",
        sendAsset: { code: "USDC", issuer: "GB123456789012345678901234567890123456789" },
        sendAmount: "5",
        destAsset: { code: "XLM", issuer: "" },
        destMinAmount: "10",
      }),
    ).rejects.toThrow();
  });
});
