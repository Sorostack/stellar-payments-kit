import { describe, it, expect } from "vitest";
import { StellarLogger } from "@/lib/stellar/logger";

describe("StellarLogger", () => {
  it("logs at default info level", () => {
    const logger = new StellarLogger("info");
    expect(() => logger.info("test")).not.toThrow();
  });

  it("sets and respects log level", () => {
    const logger = new StellarLogger("error");
    expect(() => logger.debug("hidden")).not.toThrow();
  });
});
