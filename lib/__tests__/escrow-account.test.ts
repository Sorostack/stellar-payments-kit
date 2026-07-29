import { describe, it, expect } from "vitest";
import { setupEscrowAccount } from "@/lib/stellar/escrow-account";

describe("setupEscrowAccount", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      setupEscrowAccount({
        sourceSecret: "bad",
        escrowPublicKey: "GABC1234567890123456789012345678901234567890123",
        amount: "100",
      }),
    ).rejects.toThrow();
  });
});
