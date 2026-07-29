import { describe, it, expect } from "vitest";
import { createTimeLock } from "@/lib/stellar/time-lock";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("TimeLock", () => {
  it("creates time lock with future date", () => {
    const future = Date.now() + 86400000;
    const result = createTimeLock(
      generateKeypair().publicKey,
      "100",
      future,
    );
    expect(result).toBeDefined();
  });
});
