import { describe, it, expect, vi } from "vitest";
import { getAssetPrice } from "@/lib/stellar/oracle";

describe("getAssetPrice", () => {
  it("throws for invalid asset", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("fetch failed"));
    await expect(getAssetPrice("INVALID123")).rejects.toThrow();
    vi.restoreAllMocks();
  });
});
