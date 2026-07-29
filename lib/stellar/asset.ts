import { Asset } from "@stellar/stellar-sdk";

export interface AssetDescriptor {
  code: string;
  issuer?: string;
  isNative: boolean;
}

export function describeAsset(asset: Asset): AssetDescriptor {
  if (asset.isNative()) {
    return { code: "XLM", isNative: true };
  }
  return {
    code: asset.getCode(),
    issuer: asset.getIssuer(),
    isNative: false,
  };
}

export function createAsset(code: string, issuer?: string): Asset {
  if (code === "XLM" || !issuer) return Asset.native();
  return new Asset(code, issuer);
}

export function assetToString(asset: AssetDescriptor): string {
  if (asset.isNative) return "XLM";
  return `${asset.code}:${asset.issuer}`;
}
