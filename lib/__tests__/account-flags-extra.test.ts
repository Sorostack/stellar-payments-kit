import { describe, it, expect } from "vitest";
import { setAccountFlags } from "@/lib/stellar/account-flags";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("AccountFlags", () => {
  it("sets authorization flags", () => {
    const result = setAccountFlags(
      generateKeypair().publicKey,
      { authorizationRequired: true, authorizationRevocable: true },
    );
    expect(result).toBeDefined();
  });
});
