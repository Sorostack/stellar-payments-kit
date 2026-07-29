import { describe, it, expect } from "vitest";
import { modifySetOptions } from "@/lib/stellar/set-options";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("SetOptions", () => {
  it("modifies account options", () => {
    const result = modifySetOptions(
      generateKeypair().publicKey,
      { homeDomain: "example.com", inflationDest: generateKeypair().publicKey },
    );
    expect(result).toBeDefined();
  });
});
