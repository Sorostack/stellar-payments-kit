import { describe, it, expect } from "vitest";
import { calculateOperationFee } from "@/lib/stellar/fee-estimation";

describe("calculateOperationFee", () => {
  it("calculates fee based on operation count", () => {
    const fee = calculateOperationFee(3, "100");
    expect(fee).toBe("300");
  });
});
