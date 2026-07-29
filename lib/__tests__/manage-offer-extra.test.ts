import { describe, it, expect } from "vitest";
import { createOffer, cancelOffer } from "@/lib/stellar/manage-offer";

describe("ManageOffer", () => {
  it("creates sell offer", () => {
    const result = createOffer(
      "XLM", "USDC", "100", "0.5", true,
    );
    expect(result).toBeDefined();
  });

  it("cancels an offer", () => {
    const result = cancelOffer(12345);
    expect(result).toBeDefined();
  });
});
