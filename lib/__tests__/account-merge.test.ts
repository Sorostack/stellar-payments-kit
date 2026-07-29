import { describe, it, expect } from "vitest";
import { mergeAccount } from "@/lib/stellar/account-merge";

describe("mergeAccount", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      mergeAccount({
        sourceSecret: "bad",
        destinationPublicKey: "GABC1234567890123456789012345678901234567890123",
      }),
    ).rejects.toThrow();
  });
});
