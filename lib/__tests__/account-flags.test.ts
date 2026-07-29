import { describe, it, expect } from "vitest";
import { setAuthRequired } from "@/lib/stellar/account-flags";

describe("setAuthRequired", () => {
  it("throws with invalid secret key", async () => {
    await expect(setAuthRequired("bad", true)).rejects.toThrow();
  });
});
