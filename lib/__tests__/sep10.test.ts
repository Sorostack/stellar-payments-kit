import { describe, it, expect } from "vitest";
import { authenticateWithSep10 } from "@/lib/stellar/sep10";

describe("authenticateWithSep10", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      authenticateWithSep10("bad-server-key", "bad-client-key", "https://example.com/auth"),
    ).rejects.toThrow();
  });
});
