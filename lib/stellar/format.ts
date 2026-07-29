export function formatStroops(lumens: string): string {
  const num = Number(lumens);
  if (Number.isNaN(num)) throw new Error(`Invalid lumen amount: ${lumens}`);
  return String(Math.round(num * 10_000_000));
}

export function formatLumens(stroops: string): string {
  const num = Number(stroops);
  if (Number.isNaN(num)) throw new Error(`Invalid stroop amount: ${stroops}`);
  return (num / 10_000_000).toFixed(7);
}

export function shortenKey(key: string, chars = 8): string {
  if (key.length <= chars * 2 + 3) return key;
  return `${key.slice(0, chars)}...${key.slice(-chars)}`;
}

export function formatBalance(balance: string, decimals = 7): string {
  const num = Number(balance);
  if (Number.isNaN(num)) return balance;
  return num.toFixed(decimals);
}

export function parseAssetString(asset: string): { code: string; issuer?: string } {
  if (asset === "XLM") return { code: "XLM" };
  const parts = asset.split(":");
  if (parts.length === 2) return { code: parts[0], issuer: parts[1] };
  throw new Error(`Invalid asset string: ${asset}`);
}
