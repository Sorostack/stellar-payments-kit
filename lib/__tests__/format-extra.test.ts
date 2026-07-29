import { describe, it, expect } from "vitest";
import { formatBalance, truncateBalance } from "@/lib/stellar/format";

describe("Format", () => {
  it("formats balance with precision", () => {
    expect(formatBalance("100.1234567", 4)).toBe("100.1234");
  });

  it("truncates long balances", () => {
    const result = truncateBalance("123456789.1234567");
    expect(result.length).toBeLessThan(20);
  });
});
