import { describe, it, expect } from "vitest";
import { PaymentChannel } from "@/lib/stellar/payment-channel";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("PaymentChannel", () => {
  it("creates channel with valid key", () => {
    const { secretKey } = generateKeypair();
    const channel = new PaymentChannel(secretKey);
    expect(channel.getPublicKey()).toMatch(/^G/);
  });
});
