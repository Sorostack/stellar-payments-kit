import { describe, it, expect } from "vitest";
import { STELLAR_CONSTANTS, NETWORK_PASSPHRASES, ERROR_CODES } from "@/lib/stellar/constants";

describe("Constants", () => {
  describe("STELLAR_CONSTANTS", () => {
    it("has BASE_FEE", () => {
      expect(STELLAR_CONSTANTS.BASE_FEE).toBe("100");
    });
  });

  describe("NETWORK_PASSPHRASES", () => {
    it("has testnet passphrase", () => {
      expect(NETWORK_PASSPHRASES.testnet).toContain("Test SDF Network");
    });
  });

  describe("ERROR_CODES", () => {
    it("has common error codes", () => {
      expect(ERROR_CODES.INVALID_PUBLIC_KEY).toBe("ERR_INVALID_PUBLIC_KEY");
      expect(ERROR_CODES.NETWORK_ERROR).toBe("ERR_NETWORK");
    });
  });
});
