import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/stellar/network", () => ({
  getServer: vi.fn(() => ({
    serverURL: new URL("https://horizon-testnet.stellar.org"),
  })),
  getNetworkConfig: vi.fn(() => ({
    networkPassphrase: "Test SDF Network ; September 2015",
    horizonUrl: "https://horizon-testnet.stellar.org",
    friendbotUrl: "https://friendbot.stellar.org",
  })),
}));

describe("network mocks", () => {
  it("uses mocked network config", async () => {
    const { getNetworkConfig } = await import("@/lib/stellar/network");
    const config = getNetworkConfig("testnet");
    expect(config.networkPassphrase).toBe("Test SDF Network ; September 2015");
  });
});
