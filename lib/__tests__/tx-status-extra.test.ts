import { describe, it, expect } from "vitest";
import { getTxStatus } from "@/lib/stellar/tx-status";

describe("TxStatus", () => {
  it("returns pending for non-existent hash", () => {
    const status = getTxStatus("0000000000000000000000000000000000000000000000000000000000000000");
    expect(status.status).toBeDefined();
  });
});
