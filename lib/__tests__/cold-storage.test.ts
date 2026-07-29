import { describe, it, expect } from "vitest";
import { createColdStorageAccount } from "@/lib/stellar/cold-storage";

describe("createColdStorageAccount", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      createColdStorageAccount("bad", "GABC1234567890123456789012345678901234567890123", "10"),
    ).rejects.toThrow();
  });
});
