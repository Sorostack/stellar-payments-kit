import { describe, it, expect } from "vitest";
import { StellarCache } from "@/lib/stellar/cache";

describe("StellarCache", () => {
  it("stores and retrieves values", () => {
    const cache = new StellarCache(60000);
    cache.set("key1", "value1");
    expect(cache.get("key1")).toBe("value1");
  });

  it("returns undefined for missing keys", () => {
    const cache = new StellarCache(60000);
    expect(cache.get("missing")).toBeUndefined();
  });

  it("deletes keys", () => {
    const cache = new StellarCache(60000);
    cache.set("key1", "value1");
    cache.delete("key1");
    expect(cache.get("key1")).toBeUndefined();
  });

  it("clears all keys", () => {
    const cache = new StellarCache(60000);
    cache.set("a", "1");
    cache.set("b", "2");
    cache.clear();
    expect(cache.size).toBe(0);
  });
});
