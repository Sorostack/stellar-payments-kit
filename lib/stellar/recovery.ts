import { Keypair } from "@stellar/stellar-sdk";
import { accountExists } from "./accounts";

export interface RecoveryConfig {
  m: number;
  n: number;
  guardians: string[];
}

export function splitSecret(secretKey: string, totalShares: number): string[] {
  const shares: string[] = [];
  const chars = secretKey.split("");

  const shareSize = Math.ceil(chars.length / totalShares);
  for (let i = 0; i < totalShares; i++) {
    const start = i * shareSize;
    const share = chars.slice(start, start + shareSize).join("");
    if (share) shares.push(share);
  }

  return shares;
}

export function recoverKeypair(shares: string[]): Keypair | null {
  try {
    const combined = shares.join("");
    return Keypair.fromSecret(combined);
  } catch {
    return null;
  }
}

export function validateRecoveryConfig(config: RecoveryConfig): boolean {
  if (config.m < 1) return false;
  if (config.n < config.m) return false;
  if (config.guardians.length !== config.n) return false;
  return true;
}
