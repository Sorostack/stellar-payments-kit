import { describe, it, expect } from "vitest";
import { PaymentChannel } from "@/lib/stellar/payment-channel";

describe("PaymentChannel", () => {
  it("creates channel with valid key", () => {
    const channel = new PaymentChannel("SABC1234567890123456789012345678901234567890123");
    expect(channel.getPublicKey()).toMatch(/^G/);
  });
});
