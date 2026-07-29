import { describe, it, expect } from "vitest";
import { subscribeToPayments } from "@/lib/stellar/events";

describe("subscribeToPayments", () => {
  it("returns an unsubscribe function", () => {
    const unsubscribe = subscribeToPayments("GABC...", () => {});
    expect(typeof unsubscribe).toBe("function");
    unsubscribe();
  });
});
