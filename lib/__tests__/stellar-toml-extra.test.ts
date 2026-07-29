import { describe, it, expect } from "vitest";
import { fetchStellarToml } from "@/lib/stellar/stellar-toml";

describe("StellarToml", () => {
  it("throws for invalid domain", async () => {
    await expect(fetchStellarToml("")).rejects.toThrow();
  });
});
