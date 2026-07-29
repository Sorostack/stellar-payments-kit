import { describe, it, expect } from "vitest";
import { createProvider } from "@/lib/stellar/integrations";

describe("Integrations", () => {
  it("creates provider", () => {
    const provider = createProvider("TestAPI", "https://api.test.com", "key123");
    expect(provider.name).toBe("TestAPI");
    expect(provider.baseUrl).toBe("https://api.test.com");
  });
});
