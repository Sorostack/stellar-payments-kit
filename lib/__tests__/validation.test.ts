import { describe, it, expect } from "vitest";
import {
  isValidPublicKey,
  isValidSecretKey,
  isValidAmount,
  isValidMemo,
} from "@/lib/stellar/validation";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("isValidPublicKey", () => {
  it("accepts a valid Stellar public key", () => {
    const { publicKey } = generateKeypair();
    expect(isValidPublicKey(publicKey)).toBe(true);
  });

  it("rejects an invalid public key", () => {
    expect(isValidPublicKey("not-a-key")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isValidPublicKey("")).toBe(false);
  });
});

describe("isValidSecretKey", () => {
  it("accepts a valid Stellar secret key", () => {
    const { secretKey } = generateKeypair();
    expect(isValidSecretKey(secretKey)).toBe(true);
  });

  it("rejects an invalid secret key", () => {
    expect(isValidSecretKey("not-a-key")).toBe(false);
  });
});

describe("isValidAmount", () => {
  it("accepts whole numbers", () => {
    expect(isValidAmount("100")).toBe(true);
  });

  it("accepts decimal amounts", () => {
    expect(isValidAmount("10.5")).toBe(true);
  });

  it("rejects zero", () => {
    expect(isValidAmount("0")).toBe(false);
  });

  it("rejects negative amounts", () => {
    expect(isValidAmount("-5")).toBe(false);
  });

  it("rejects non-numeric strings", () => {
    expect(isValidAmount("abc")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isValidAmount("")).toBe(false);
  });
});

describe("isValidMemo", () => {
  it("accepts short memos", () => {
    expect(isValidMemo("hello")).toBe(true);
  });

  it("rejects memos longer than 28 bytes", () => {
    expect(isValidMemo("a".repeat(29))).toBe(false);
  });
});
