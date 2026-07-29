import { describe, it, expect } from "vitest";
import { resolveFederationAddress } from "@/lib/stellar/federation";

describe("resolveFederationAddress", () => {
  it("throws on invalid address format", async () => {
    await expect(resolveFederationAddress("invalid")).rejects.toThrow("Invalid federation address");
  });

  it("handles valid format even if domain doesn't exist", async () => {
    await expect(
      resolveFederationAddress("user*nonexistent-domain-stellar.xyz"),
    ).rejects.toThrow();
  });
});
