import { describe, it, expect, vi, beforeEach } from "vitest";
import { pollTransactionStatus } from "@/lib/stellar/tx-status";

vi.mock("@/lib/stellar/network", () => ({
  getServer: vi.fn(() => ({
    transactions: vi.fn(() => ({
      transaction: vi.fn(() => ({
        call: vi.fn().mockRejectedValue(new Error("not found")),
      })),
    })),
  })),
  getNetworkConfig: vi.fn(() => ({
    networkPassphrase: "Test SDF Network ; September 2015",
  })),
}));

describe("pollTransactionStatus", () => {
  it("returns unconfirmed when max retries exceeded", async () => {
    const result = await pollTransactionStatus("abc123", "testnet", 2, 10);
    expect(result.confirmed).toBe(false);
    expect(result.hash).toBe("abc123");
  }, 10000);
});
