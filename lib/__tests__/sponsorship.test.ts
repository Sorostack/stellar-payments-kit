import { describe, it, expect } from "vitest";
import { beginSponsoring } from "@/lib/stellar/sponsorship";

describe("beginSponsoring", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      beginSponsoring({
        sponsorSecret: "bad",
        sponsoredPublicKey: "GABC1234567890123456789012345678901234567890123",
      }),
    ).rejects.toThrow();
  });
});
