import { describe, it, expect } from "vitest";
import { getAccountTransactions } from "@/lib/stellar/pagination";

describe("getAccountTransactions", () => {
  it("throws for invalid account", async () => {
    await expect(
      getAccountTransactions("GABC1234567890123456789012345678901234567890123"),
    ).rejects.toThrow();
  });
});
