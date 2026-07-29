export interface AnchorInfo {
  name: string;
  homeDomain: string;
  webAuthEndpoint: string;
  depositServer: string;
  withdrawServer: string;
  transferServer: string;
  assets: AnchorAsset[];
}

export interface AnchorAsset {
  code: string;
  issuer: string;
  sep24Enabled: boolean;
  sep6Enabled: boolean;
  depositMinAmount?: string;
  withdrawMinAmount?: string;
}

export function getAnchorUrl(homeDomain: string): string {
  return `https://${homeDomain}/.well-known/stellar.toml`;
}

export function validateAnchorAsset(asset: AnchorAsset): boolean {
  if (!asset.code || asset.code.length === 0) return false;
  if (!asset.issuer || !asset.issuer.startsWith("G")) return false;
  if (asset.issuer.length !== 56) return false;
  return true;
}

export function formatAssetCode(code: string): string {
  return code.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}
