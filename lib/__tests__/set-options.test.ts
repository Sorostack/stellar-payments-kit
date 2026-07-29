import { describe, it, expect } from "vitest";
import { setAccountOptions } from "@/lib/stellar/set-options";

describe("setAccountOptions", () => {
  it("throws with invalid secret key", async () => {
    await expect(
      setAccountOptions({
        sourceSecret: "bad",
        homeDomain: "example.com",
      }),
    ).rejects.toThrow();
  });
});
