import type { NextRequest } from "next/server";
import { isValidPublicKey } from "./validation";

export type MiddlewareContext = {
  request: NextRequest;
  params: Record<string, string>;
};

export type MiddlewareFn = (ctx: MiddlewareContext) => Promise<Response | null>;

export class StellarMiddleware {
  private middlewares: MiddlewareFn[] = [];

  use(fn: MiddlewareFn): void {
    this.middlewares.push(fn);
  }

  async run(request: NextRequest, params: Record<string, string>): Promise<Response | null> {
    const ctx: MiddlewareContext = { request, params };
    for (const fn of this.middlewares) {
      const result = await fn(ctx);
      if (result) return result;
    }
    return null;
  }
}

export function validatePublicKeyParam(paramName: string): MiddlewareFn {
  return async (ctx) => {
    const value = ctx.params[paramName];
    if (value && !isValidPublicKey(value)) {
      return new Response(JSON.stringify({ error: `Invalid ${paramName}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return null;
  };
}
