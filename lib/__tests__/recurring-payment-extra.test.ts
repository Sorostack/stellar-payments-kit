import { describe, it, expect } from "vitest";
import { createScheduledPayment, cancelScheduledPayment } from "@/lib/stellar/recurring-payment";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("RecurringPayment", () => {
  it("creates scheduled payment", () => {
    const result = createScheduledPayment(
      generateKeypair().publicKey,
      generateKeypair().publicKey,
      "10",
      86400000,
      5,
    );
    expect(result).toBeDefined();
  });

  it("cancels scheduled payment", () => {
    expect(() => cancelScheduledPayment("schedule-1")).not.toThrow();
  });
});
