import { describe, it, expect } from "vitest";
import { createSponsorshipEntry } from "@/lib/stellar/sponsorship";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Sponsorship", () => {
  it("creates sponsorship entry", () => {
    const sponsor = generateKeypair();
    const result = createSponsorshipEntry(sponsor.publicKey, "GABC123");
    expect(result).toBeDefined();
  });
});
