import { describe, it, expect } from "vitest";
import { authenticateWithSEP10 } from "@/lib/stellar/sep10";

describe("SEP10", () => {
  it("throws with invalid domain", async () => {
    await expect(
      authenticateWithSEP10("invalid-domain-12345", "SABC123"),
    ).rejects.toThrow();
  });
});
