import { describe, it, expect, afterEach } from "vitest";
import { configure, getConfig, resetConfig, defaultConfig } from "@/lib/config";

describe("Config", () => {
  afterEach(() => resetConfig());

  it("has default values", () => {
    expect(defaultConfig.horizonUrl).toBe("https://horizon-testnet.stellar.org");
  });

  it("merges custom config", () => {
    configure({ horizonUrl: "https://custom.horizon.com" });
    expect(getConfig().horizonUrl).toBe("https://custom.horizon.com");
  });

  it("resets to defaults", () => {
    configure({ defaultFee: "500" });
    resetConfig();
    expect(getConfig().defaultFee).toBe("100");
  });
});
