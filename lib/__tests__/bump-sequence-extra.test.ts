import { describe, it, expect } from "vitest";
import { createBumpSequence } from "@/lib/stellar/bump-sequence";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("BumpSequence", () => {
  it("creates bump sequence operation", () => {
    const result = createBumpSequence(
      generateKeypair().publicKey,
      12345,
    );
    expect(result).toBeDefined();
  });
});
