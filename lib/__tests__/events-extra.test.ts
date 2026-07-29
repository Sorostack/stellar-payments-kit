import { describe, it, expect } from "vitest";
import { subscribeToAccountEvents, unsubscribeFromAccount } from "@/lib/stellar/events";

describe("Events", () => {
  it("subscribes to account events", () => {
    const callback = () => {};
    const subscription = subscribeToAccountEvents("GABC123", callback);
    expect(subscription).toBeDefined();
  });

  it("unsubscribes without error", () => {
    expect(() => unsubscribeFromAccount("GABC123")).not.toThrow();
  });
});
