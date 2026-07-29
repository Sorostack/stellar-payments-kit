import { describe, it, expect } from "vitest";
import { createClaimableBalance } from "@/lib/stellar/claimable-balance";

describe("createClaimableBalance", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      createClaimableBalance({
        sourceSecret: "bad",
        claimant: "GABC1234567890123456789012345678901234567890123",
        amount: "100",
      }),
    ).rejects.toThrow();
  });
});
