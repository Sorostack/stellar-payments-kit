import { describe, it, expect } from "vitest";
import { startAccountMerge } from "@/lib/stellar/account-merge";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("AccountMerge", () => {
  it("creates account merge operation", () => {
    const result = startAccountMerge(
      generateKeypair().publicKey,
      generateKeypair().publicKey,
    );
    expect(result).toBeDefined();
  });
});
