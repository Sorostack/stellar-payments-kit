import { describe, it, expect } from "vitest";
import { addSigner } from "@/lib/stellar/multisig";

describe("addSigner", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      addSigner({
        sourceSecret: "bad",
        signerPublicKey: "GABC1234567890123456789012345678901234567890123",
        weight: 1,
      }),
    ).rejects.toThrow();
  });
});
