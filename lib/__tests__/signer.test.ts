import { describe, it, expect } from "vitest";
import { addEd25519Signer } from "@/lib/stellar/signer";

describe("addEd25519Signer", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      addEd25519Signer("bad", "GA1234567890123456789012345678901234567890123", 1),
    ).rejects.toThrow();
  });
});
