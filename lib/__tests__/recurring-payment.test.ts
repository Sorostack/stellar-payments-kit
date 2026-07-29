import { describe, it, expect } from "vitest";
import { RecurringPaymentScheduler } from "@/lib/stellar/recurring-payment";

describe("RecurringPaymentScheduler", () => {
  it("creates scheduler with correct config", () => {
    const scheduler = new RecurringPaymentScheduler({
      sourceSecret: "SABC1234567890123456789012345678901234567890123",
      destinationPublicKey: "GABC1234567890123456789012345678901234567890123",
      amount: "10",
      intervalMs: 60000,
      maxPayments: 5,
    });
    expect(scheduler.getPayments()).toHaveLength(5);
  });
});
