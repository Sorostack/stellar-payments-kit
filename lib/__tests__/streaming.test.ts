import { describe, it, expect } from "vitest";
import { PaymentStream } from "@/lib/stellar/streaming";

describe("PaymentStream", () => {
  it("throws with invalid server URL", () => {
    expect(
      () => new PaymentStream("not-a-url", "GABC123", { onMessage: () => {} }),
    ).toThrow();
  });
});
