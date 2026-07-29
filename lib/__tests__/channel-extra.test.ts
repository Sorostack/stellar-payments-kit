import { describe, it, expect } from "vitest";
import { signWithChannel, createChannelAccount } from "@/lib/stellar/channel";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("Channel", () => {
  it("creates channel account", () => {
    const result = createChannelAccount(generateKeypair().publicKey);
    expect(result).toBeDefined();
  });
});
