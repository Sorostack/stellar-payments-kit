import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAccountInfo } from "@/lib/stellar/react/useAccountInfo";

describe("useAccountInfo", () => {
  it("initializes with default state", () => {
    const { result } = renderHook(() => useAccountInfo());
    expect(result.current.loading).toBe(false);
    expect(result.current.info).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
