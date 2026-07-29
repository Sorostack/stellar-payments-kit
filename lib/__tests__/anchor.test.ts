import { describe, it, expect } from "vitest";
import { validateAnchorAsset, formatAssetCode, getAnchorUrl } from "@/lib/stellar/anchor";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Anchor", () => {
  describe("validateAnchorAsset", () => {
    it("validates correct asset", () => {
      const { publicKey } = generateKeypair();
      expect(validateAnchorAsset({ code: "USDC", issuer: publicKey })).toBe(true);
    });

    it("rejects empty code", () => {
      const { publicKey } = generateKeypair();
      expect(validateAnchorAsset({ code: "", issuer: publicKey })).toBe(false);
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
