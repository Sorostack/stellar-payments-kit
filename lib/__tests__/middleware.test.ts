import { describe, it, expect } from "vitest";
import { StellarMiddleware, validatePublicKeyParam } from "@/lib/stellar/middleware";

describe("StellarMiddleware", () => {
  it("runs without middlewares", async () => {
    const mw = new StellarMiddleware();
    const result = await mw.run({} as any, {});
    expect(result).toBeNull();
  });

  it("stops on middleware response", async () => {
    const mw = new StellarMiddleware();
    mw.use(async () => new Response("blocked", { status: 403 }));
    const result = await mw.run({} as any, {});
    expect(result?.status).toBe(403);
  });
});

describe("validatePublicKeyParam", () => {
  it("returns null for valid key", async () => {
    const mw = validatePublicKeyParam("account");
    const result = await mw({ request: {} as any, params: { account: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5W34" } });
    expect(result).toBeNull();
  });
});
