import { describe, it, expect } from "vitest";
import {
  StellarPaymentError,
  isNotFoundError,
  isInsufficientBalanceError,
} from "@/lib/stellar/errors";

describe("StellarPaymentError", () => {
  it("creates an error with code and message", () => {
    const error = new StellarPaymentError("Account not found", "ACCOUNT_NOT_FOUND");
    expect(error.message).toBe("Account not found");
    expect(error.code).toBe("ACCOUNT_NOT_FOUND");
    expect(error.name).toBe("StellarPaymentError");
  });
});

describe("isNotFoundError", () => {
  it("returns true for ACCOUNT_NOT_FOUND error", () => {
    const error = new StellarPaymentError("Not found", "ACCOUNT_NOT_FOUND");
    expect(isNotFoundError(error)).toBe(true);
  });

  it("returns false for other errors", () => {
    const error = new StellarPaymentError("Bad", "BAD_REQUEST");
    expect(isNotFoundError(error)).toBe(false);
  });
});

describe("isInsufficientBalanceError", () => {
  it("returns true for INSUFFICIENT_BALANCE error", () => {
    const error = new StellarPaymentError("Low balance", "INSUFFICIENT_BALANCE");
    expect(isInsufficientBalanceError(error)).toBe(true);
  });
});
