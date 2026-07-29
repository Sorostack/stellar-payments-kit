import { describe, it, expect } from "vitest";
import { setupColdStorage, createColdStoragePayment } from "@/lib/stellar/cold-storage";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("ColdStorage", () => {
  it("sets up cold storage account", () => {
    const result = setupColdStorage(
      generateKeypair().publicKey,
      generateKeypair().publicKey,
    );
    expect(result).toBeDefined();
  });

  it("creates cold storage payment", () => {
    const result = createColdStoragePayment(
      generateKeypair().publicKey,
      "500",
    );
    expect(result).toBeDefined();
  });
});
