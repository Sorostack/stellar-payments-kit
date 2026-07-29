import { describe, it, expect } from "vitest";
import { setDataEntry } from "@/lib/stellar/data-entry";

describe("setDataEntry", () => {
  it("throws with invalid secret key", async () => {
    await expect(setDataEntry("bad", "key", "value")).rejects.toThrow();
  });
});
