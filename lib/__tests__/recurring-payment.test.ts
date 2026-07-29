import { describe, it, expect } from "vitest";
import { RecurringPaymentScheduler } from "@/lib/stellar/recurring-payment";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("RecurringPaymentScheduler", () => {
  it("creates scheduler with correct parameters", () => {
    const { secretKey } = generateKeypair();
    const { publicKey } = generateKeypair();
    const scheduler = new RecurringPaymentScheduler({
      sourceSecret: secretKey,
      destinationPublicKey: publicKey,
      amount: "10",
      intervalMs: 60000,
      maxPayments: 5,
    });
    expect(scheduler).toBeDefined();
  });
});
