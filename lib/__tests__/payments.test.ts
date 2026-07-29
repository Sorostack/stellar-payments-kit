import { describe, it, expect, vi, beforeEach } from "vitest";
import { Keypair } from "@stellar/stellar-sdk";

vi.mock("@/lib/stellar/network", () => ({
  getServer: vi.fn(() => ({
    loadAccount: vi.fn().mockResolvedValue({
      sequenceNumber: "123",
      accountId: () => "G...",
    }),
    submitTransaction: vi.fn().mockResolvedValue({
      hash: "abc123",
      ledger: 456,
    }),
  })),
  getNetworkConfig: vi.fn(() => ({
    networkPassphrase: "Test SDF Network ; September 2015",
  })),
}));

describe("payments", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("exports sendPayment and sendAssetPayment and addTrustline", async () => {
    const mod = await import("@/lib/stellar/payments");
    expect(mod.sendPayment).toBeDefined();
    expect(mod.sendAssetPayment).toBeDefined();
    expect(mod.addTrustline).toBeDefined();
  });

  it("sendPayment returns hash and ledger", async () => {
    const { sendPayment } = await import("@/lib/stellar/payments");
    const keypair = Keypair.random();
    const result = await sendPayment({
      sourceSecret: keypair.secret(),
      destinationPublicKey: keypair.publicKey(),
      amount: "100",
      network: "testnet",
    });
    expect(result.hash).toBe("abc123");
    expect(result.ledger).toBe(456);
  });

  it("sendAssetPayment works with asset params", async () => {
    const { sendAssetPayment } = await import("@/lib/stellar/payments");
    const keypair = Keypair.random();
    const result = await sendAssetPayment({
      sourceSecret: keypair.secret(),
      destinationPublicKey: keypair.publicKey(),
      amount: "50",
      assetCode: "USDC",
      assetIssuer: keypair.publicKey(),
      memo: "test",
      network: "testnet",
    });
    expect(result.hash).toBe("abc123");
  });

  it("addTrustline works with accountSecret", async () => {
    const { addTrustline } = await import("@/lib/stellar/payments");
    const keypair = Keypair.random();
    const result = await addTrustline({
      accountSecret: keypair.secret(),
      assetCode: "USDC",
      assetIssuer: keypair.publicKey(),
      network: "testnet",
    });
    expect(result.hash).toBe("abc123");
  });
});
