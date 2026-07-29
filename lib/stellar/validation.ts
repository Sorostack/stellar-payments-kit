const STELLAR_PUBLIC_KEY_REGEX = /^G[A-Z0-9]{55}$/;
const STELLAR_SECRET_KEY_REGEX = /^S[A-Z0-9]{55}$/;

export function isValidPublicKey(key: string): boolean {
  return STELLAR_PUBLIC_KEY_REGEX.test(key);
}

export function isValidSecretKey(key: string): boolean {
  return STELLAR_SECRET_KEY_REGEX.test(key);
}

export function isValidAmount(amount: string): boolean {
  if (!amount || typeof amount !== "string") return false;
  const num = Number(amount);
  return !Number.isNaN(num) && num > 0 && /^\d+(\.\d{1,7})?$/.test(amount);
}

export function isValidMemo(memo: string): boolean {
  return memo.length <= 28;
}
