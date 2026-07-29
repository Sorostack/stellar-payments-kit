import { describe, it, expect } from "vitest";
import { ChannelAccountManager } from "@/lib/stellar/channel";
import { generateKeypair } from "@/lib/stellar/accounts";

describe("ChannelAccountManager", () => {
  it("rotates through channels", () => {
    const kp1 = generateKeypair();
    const kp2 = generateKeypair();
    const mgr = new ChannelAccountManager([kp1.secretKey, kp2.secretKey]);
    expect(mgr.channelsCount).toBe(2);
    const first = mgr.nextChannel();
    const second = mgr.nextChannel();
    expect(first.publicKey()).not.toBe(second.publicKey());
  });

  it("wraps around when exceeding channel count", () => {
    const kp = generateKeypair();
    const mgr = new ChannelAccountManager([kp.secretKey]);
    const first = mgr.nextChannel();
    const second = mgr.nextChannel();
    expect(first.publicKey()).toBe(second.publicKey());
  });
});
