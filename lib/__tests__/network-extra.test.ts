import { describe, it, expect } from "vitest";
import { getNetworkConfig, isTestnet, isPublic } from "@/lib/stellar/network";

describe("Network", () => {
  it("detects testnet", () => {
    expect(isTestnet("https://horizon-testnet.stellar.org")).toBe(true);
  });

  it("detects public network", () => {
    expect(isPublic("https://horizon.stellar.org")).toBe(true);
  });
});
