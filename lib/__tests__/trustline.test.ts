import { describe, it, expect } from "vitest";
import { changeTrust } from "@/lib/stellar/trustline";

describe("changeTrust", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      changeTrust("bad", "USDC", "GA1234567890123456789012345678901234567890123"),
    ).rejects.toThrow();
  });
});
