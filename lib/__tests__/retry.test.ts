import { describe, it, expect, vi } from "vitest";
import { withRetry } from "@/lib/stellar/retry";

describe("withRetry", () => {
  it("resolves on first attempt", async () => {
    const result = await withRetry(() => Promise.resolve("ok"));
    expect(result).toBe("ok");
  });

  it("rejects after max attempts", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("fail"));
    await expect(withRetry(fn, { maxAttempts: 2, baseDelayMs: 10 })).rejects.toThrow("fail");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("succeeds on retry", async () => {
    let attempts = 0;
    const fn = vi.fn().mockImplementation(() => {
      attempts++;
      if (attempts < 2) return Promise.reject(new Error("not yet"));
      return Promise.resolve("success");
    });
    const result = await withRetry(fn, { maxAttempts: 3, baseDelayMs: 10 });
    expect(result).toBe("success");
  });
});
