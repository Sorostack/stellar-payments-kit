import { describe, it, expect, vi } from "vitest";
import { getAccountTransactions } from "@/lib/stellar/pagination";

describe("getAccountTransactions", () => {
  it("throws for invalid account", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("fetch failed"));
    await expect(getAccountTransactions("GABC123")).rejects.toThrow();
    vi.restoreAllMocks();
  });
});
