import { describe, it, expect } from "vitest";
import { Asset } from "@stellar/stellar-sdk";
import {
  createNativeAsset,
  createAsset,
  parseAssetString,
} from "@/lib/stellar/asset";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Asset integration", () => {
  it("creates and parses asset", () => {
    const { publicKey } = generateKeypair();
    const asset = createAsset("USDC", publicKey);
    expect(asset.code).toBe("USDC");
    expect(asset.issuer).toBe(publicKey);
  });

  it("creates native asset", () => {
    const asset = createNativeAsset();
    expect(asset.code).toBe("XLM");
  });
});
