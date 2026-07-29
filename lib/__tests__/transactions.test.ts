import { describe, it, expect } from "vitest";
import { decodeTransactionXdr, getExplorerUrl } from "@/lib/stellar/transactions";

describe("getExplorerUrl", () => {
  it("returns testnet URL for testnet", () => {
    const url = getExplorerUrl("abc123", "testnet");
    expect(url).toBe("https://stellar.expert/explorer/testnet/tx/abc123");
  });

  it("returns public URL for mainnet", () => {
    const url = getExplorerUrl("abc123", "mainnet");
    expect(url).toBe("https://stellar.expert/explorer/public/tx/abc123");
  });
});

describe("decodeTransactionXdr", () => {
  it("throws on invalid XDR", () => {
    expect(() => decodeTransactionXdr("not-valid-xdr")).toThrow();
  });
});
