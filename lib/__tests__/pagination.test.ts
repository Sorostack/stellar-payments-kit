import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/stellar/network", () => ({
  getServer: vi.fn(() => ({
    transactions: vi.fn(() => ({
      forAccount: vi.fn(() => ({
        limit: vi.fn(() => ({
          order: vi.fn(() => ({
            call: vi.fn().mockRejectedValue(new Error("invalid account")),
          })),
        })),
      })),
    })),
  })),
  getNetworkConfig: vi.fn(() => ({
    networkPassphrase: "Test SDF Network ; September 2015",
  })),
}));

describe("getAccountTransactions", () => {
  it("throws for invalid account", async () => {
    const { getAccountTransactions } = await import("@/lib/stellar/pagination");
    await expect(getAccountTransactions("GABC123")).rejects.toThrow("invalid account");
  });
});
