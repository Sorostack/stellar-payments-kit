import { describe, it, expect } from "vitest";
import { getAssetPrice } from "@/lib/stellar/oracle";

describe("getAssetPrice", () => {
  it("throws for invalid asset", async () => {
    await expect(getAssetPrice("INVALID123")).rejects.toThrow();
  });
});
