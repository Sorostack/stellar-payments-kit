import { describe, it, expect } from "vitest";
import { estimateFee } from "@/lib/stellar/fee-estimation";

describe("FeeEstimation", () => {
  it("estimates fee for operations", () => {
    const fee = estimateFee(3, "low");
    expect(fee).toBeDefined();
    expect(typeof fee).toBe("string");
  });

  it("returns higher fee for urgent", () => {
    const low = estimateFee(1, "low");
    const urgent = estimateFee(1, "urgent");
    expect(BigInt(urgent)).toBeGreaterThan(BigInt(low));
  });
});
