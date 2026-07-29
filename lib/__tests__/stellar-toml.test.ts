import { describe, it, expect } from "vitest";

describe("fetchStellarToml", () => {
  it("throws on invalid domain", async () => {
    const { fetchStellarToml } = await import("@/lib/stellar/stellar-toml");
    await expect(fetchStellarToml("nonexistent-domain-xyz.com")).rejects.toThrow();
  });
});
