import { describe, it, expect } from "vitest";
import { bumpSequence } from "@/lib/stellar/bump-sequence";

describe("bumpSequence", () => {
  it("throws with invalid secret key", async () => {
    await expect(bumpSequence("bad", "12345")).rejects.toThrow();
  });
});
