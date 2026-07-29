import { describe, it, expect } from "vitest";
import { authenticateWithSoroban } from "@/lib/stellar/soroban-auth";

describe("authenticateWithSoroban", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      authenticateWithSoroban({
        sourceSecret: "bad",
        contractId: "CA1234567890123456789012345678901234567890123",
      }),
    ).rejects.toThrow();
  });
});
