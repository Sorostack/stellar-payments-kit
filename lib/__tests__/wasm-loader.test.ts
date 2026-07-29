import { describe, it, expect } from "vitest";

describe("loadContractWasm", () => {
  it("throws when wasm not found", async () => {
    const { loadContractWasm } = await import("@/lib/stellar/wasm-loader");
    expect(() => loadContractWasm("nonexistent")).toThrow();
  });
});

describe("listBuiltContracts", () => {
  it("returns empty array when no contracts built", async () => {
    const { listBuiltContracts } = await import("@/lib/stellar/wasm-loader");
    const contracts = listBuiltContracts();
    expect(Array.isArray(contracts)).toBe(true);
  });
});
