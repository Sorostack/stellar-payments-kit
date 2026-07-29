import { describe, it, expect } from "vitest";
import { Asset } from "@stellar/stellar-sdk";
import { describeAsset, createAsset, assetToString } from "@/lib/stellar/asset";

describe("describeAsset", () => {
  it("describes native XLM", () => {
    const desc = describeAsset(Asset.native());
    expect(desc.code).toBe("XLM");
    expect(desc.isNative).toBe(true);
  });
});

describe("createAsset", () => {
  it("creates native asset for XLM", () => {
    const asset = createAsset("XLM");
    expect(asset.isNative()).toBe(true);
  });
});

describe("assetToString", () => {
  it("formats native asset", () => {
    expect(assetToString({ code: "XLM", isNative: true })).toBe("XLM");
  });
});
