import { describe, it, expect } from "vitest";
import { formatContractCall } from "@/lib/stellar/soroban-contract";

describe("formatContractCall", () => {
  it("formats with primitives", () => {
    expect(formatContractCall("CA1", "add", [1, 2])).toBe("CA1:add(1,2)");
  });

  it("formats with objects", () => {
    expect(formatContractCall("CA1", "init", [{ key: "val" }])).toBe('CA1:init({"key":"val"})');
  });
});
