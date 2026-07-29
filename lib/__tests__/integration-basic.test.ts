import { describe, it, expect } from "vitest";
import { Horizon } from "@stellar/stellar-sdk";

const TESTNET_URL = "https://horizon-testnet.stellar.org";
const TEST_ACCOUNT = "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5W34";

describe("Integration", () => {
  it("connects to testnet", async () => {
    const server = new Horizon.Server(TESTNET_URL);
    const account = await server.loadAccount(TEST_ACCOUNT);
    expect(account.account_id()).toBe(TEST_ACCOUNT);
  }, 30000);
});
