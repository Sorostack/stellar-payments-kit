import { describe, it, expect } from "vitest";
import { createMemo } from "@/lib/stellar/memo";

describe("Memo", () => {
  it("creates text memo", () => {
    const memo = createMemo("Hello", "text");
    expect(memo).toBeDefined();
  });

  it("creates id memo", () => {
    const memo = createMemo("12345", "id");
    expect(memo).toBeDefined();
  });

  it("creates hash memo", () => {
    const memo = createMemo("deadbeef", "hash");
    expect(memo).toBeDefined();
  });

  it("returns null for none type", () => {
    expect(createMemo("", "none")).toBeNull();
  });
});
