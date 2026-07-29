import { Operation } from "@stellar/stellar-sdk";
import { setAccountOptions } from "./set-options";
import { StellarNetwork } from "./network";

export const AuthRequiredFlag = 1;
export const AuthRevocableFlag = 2;
export const AuthImmutableFlag = 4;
export const AuthClawbackEnabledFlag = 8;

export async function setAuthRequired(
  sourceSecret: string,
  enabled: boolean,
  network?: StellarNetwork,
): Promise<string> {
  return setAccountOptions({
    sourceSecret,
    setFlags: enabled ? AuthRequiredFlag : undefined,
    clearFlags: enabled ? undefined : AuthRequiredFlag,
    network,
  });
}

export async function setAuthRevocable(
  sourceSecret: string,
  enabled: boolean,
  network?: StellarNetwork,
): Promise<string> {
  return setAccountOptions({
    sourceSecret,
    setFlags: enabled ? AuthRevocableFlag : undefined,
    clearFlags: enabled ? undefined : AuthRevocableFlag,
    network,
  });
}

export async function setAuthImmutable(
  sourceSecret: string,
  enabled: boolean,
  network?: StellarNetwork,
): Promise<string> {
  return setAccountOptions({
    sourceSecret,
    setFlags: enabled ? AuthImmutableFlag : undefined,
    clearFlags: enabled ? undefined : AuthImmutableFlag,
    network,
  });
}
