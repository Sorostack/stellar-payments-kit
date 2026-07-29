import { describe, it, expect } from "vitest";
import { manageSellOffer } from "@/lib/stellar/manage-offer";

describe("manageSellOffer", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      manageSellOffer({
        sourceSecret: "bad",
        selling: { code: "XLM", issuer: "" },
        buying: { code: "USDC", issuer: "GA..." },
        amount: "10",
        price: { n: 1, d: 1 },
      }),
    ).rejects.toThrow();
  });
});
