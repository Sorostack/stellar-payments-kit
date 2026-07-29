import { describe, it, expect } from "vitest";
import { getNetworkConfig, getServer } from "@/lib/stellar/network";

describe("getNetworkConfig", () => {
  it("returns testnet config", () => {
    const config = getNetworkConfig("testnet");
    expect(config.networkPassphrase).toBe("Test SDF Network ; September 2015");
    expect(config.horizonUrl).toBe("https://horizon-testnet.stellar.org");
    expect(config.friendbotUrl).toBe("https://friendbot.stellar.org");
  });

  it("returns mainnet config", () => {
    const config = getNetworkConfig("mainnet");
    expect(config.networkPassphrase).toBe("Public Global Stellar Network ; September 2015");
    expect(config.horizonUrl).toBe("https://horizon.stellar.org");
    expect(config.friendbotUrl).toBeUndefined();
  });
});

describe("getServer", () => {
  it("creates a Horizon server for testnet", () => {
    const server = getServer("testnet");
    expect(server).toBeDefined();
    expect(server.serverURL.toString()).toContain("horizon-testnet");
  });

  it("creates a Horizon server for mainnet", () => {
    const server = getServer("mainnet");
    expect(server).toBeDefined();
    expect(server.serverURL.toString()).toContain("horizon.stellar.org");
  });
});
