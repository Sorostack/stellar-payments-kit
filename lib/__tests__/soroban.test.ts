import { describe, it, expect, vi } from "vitest";
import { Keypair } from "@stellar/stellar-sdk";

vi.mock("@/lib/stellar/network", () => ({
  getServer: vi.fn(() => ({
    loadAccount: vi.fn().mockResolvedValue({
      sequenceNumber: "1",
      accountId: () => "G...",
    }),
    submitTransaction: vi.fn().mockResolvedValue({
      hash: "soroban_tx_hash",
    }),
  })),
  getNetworkConfig: vi.fn(() => ({
    networkPassphrase: "Test SDF Network ; September 2015",
  })),
}));

describe("soroban", () => {
  it("exports invokeSorobanContract", async () => {
    const mod = await import("@/lib/stellar/soroban");
    expect(mod.invokeSorobanContract).toBeDefined();
  });

  it("invokeSorobanContract returns transaction hash", async () => {
    const { invokeSorobanContract } = await import("@/lib/stellar/soroban");
    const keypair = Keypair.random();
    const hash = await invokeSorobanContract({
      sourceSecret: keypair.secret(),
      contractId: "C...contract",
      functionName: "hello",
      args: ["world"],
      network: "testnet",
    });
    expect(hash).toBe("soroban_tx_hash");
  });
});
