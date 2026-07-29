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
  it("blocks invalid key", async () => {
    const mw = validatePublicKeyParam("account");
    const result = await mw({ request: {} as any, params: { account: "INVALID" } });
    expect(result?.status).toBe(400);
  });
});
