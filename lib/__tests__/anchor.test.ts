import { describe, it, expect } from "vitest";
import { validateAnchorAsset, formatAssetCode, getAnchorUrl } from "@/lib/stellar/anchor";

describe("Anchor", () => {
  describe("validateAnchorAsset", () => {
    it("validates correct asset", () => {
      expect(validateAnchorAsset({ code: "USDC", issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5w34" })).toBe(true);
    });

    it("rejects empty code", () => {
      expect(validateAnchorAsset({ code: "", issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5w34" })).toBe(false);
    });
  });

  describe("formatAssetCode", () => {
    it("uppercases and strips special chars", () => {
      expect(formatAssetCode("usd_coin!")).toBe("USDCOIN");
    });
  });

  describe("getAnchorUrl", () => {
    it("returns well-known URL", () => {
      expect(getAnchorUrl("example.com")).toBe("https://example.com/.well-known/stellar.toml");
    });
  });
});
