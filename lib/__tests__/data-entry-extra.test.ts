import { describe, it, expect } from "vitest";
import {
  createDataEntry,
  removeDataEntry,
} from "@/lib/stellar/data-entry";

describe("DataEntry", () => {
  it("creates data entry", () => {
    const result = createDataEntry("key1", "value1");
    expect(result).toBeDefined();
  });

  it("removes data entry", () => {
    const result = removeDataEntry("key1");
    expect(result).toBeDefined();
  });
});
