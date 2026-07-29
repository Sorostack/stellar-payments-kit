import { describe, it, expect } from "vitest";
import { calculateStakingRewards, calculateApy, isStakeUnlocked } from "@/lib/stellar/staking";

describe("Staking", () => {
  describe("calculateStakingRewards", () => {
    it("returns 0 for zero amount", () => {
      expect(calculateStakingRewards("0", 10, 86400000)).toBe("0");
    });
  });

  describe("calculateApy", () => {
    it("returns 0 for zero staked", () => {
      expect(calculateApy("100", "0", 86400000)).toBe(0);
    });
  });

  describe("isStakeUnlocked", () => {
    it("returns true for past lockup", () => {
      expect(isStakeUnlocked(0, 1)).toBe(true);
    });
  });
});
