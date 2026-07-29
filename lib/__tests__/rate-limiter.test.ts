import { describe, it, expect } from "vitest";
import { RateLimiter } from "@/lib/stellar/rate-limiter";

describe("RateLimiter", () => {
  it("allows first request", () => {
    const rl = new RateLimiter({ windowMs: 60000, maxRequests: 5 });
    expect(rl.isAllowed("user1")).toBe(true);
  });

  it("blocks excess requests", () => {
    const rl = new RateLimiter({ windowMs: 60000, maxRequests: 2 });
    expect(rl.isAllowed("user1")).toBe(true);
    expect(rl.isAllowed("user1")).toBe(true);
    expect(rl.isAllowed("user1")).toBe(false);
  });

  it("reports remaining count", () => {
    const rl = new RateLimiter({ windowMs: 60000, maxRequests: 5 });
    expect(rl.getRemaining("user1")).toBe(5);
    rl.isAllowed("user1");
    expect(rl.getRemaining("user1")).toBe(4);
  });

  it("clears all buckets", () => {
    const rl = new RateLimiter({ windowMs: 60000, maxRequests: 2 });
    rl.isAllowed("user1");
    rl.clear();
    expect(rl.getRemaining("user1")).toBe(2);
  });
});
