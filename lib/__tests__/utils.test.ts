import { describe, it, expect } from "vitest";
import { sleep, truncateMiddle, chunkArray, omit, pick } from "@/lib/stellar/utils";

describe("utils", () => {
  describe("sleep", () => {
    it("resolves after delay", async () => {
      const start = Date.now();
      await sleep(10);
      expect(Date.now() - start).toBeGreaterThanOrEqual(5);
    });
  });

  describe("truncateMiddle", () => {
    it("returns short strings as-is", () => {
      expect(truncateMiddle("short", 20)).toBe("short");
    });

    it("truncates long strings", () => {
      const result = truncateMiddle("abcdefghijklmnopqrstuvwxyz", 11);
      expect(result).toHaveLength(11);
      expect(result).toContain("...");
    });
  });

  describe("chunkArray", () => {
    it("splits into chunks", () => {
      expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });
  });

  describe("omit", () => {
    it("removes specified keys", () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toEqual({ a: 1, c: 3 });
    });
  });

  describe("pick", () => {
    it("selects specified keys", () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });
  });
});
