import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useContract } from "@/lib/stellar/react/useContract";

describe("useContract", () => {
  it("initializes with default state", () => {
    const { result } = renderHook(() => useContract());
    expect(result.current.loading).toBe(false);
    expect(result.current.hash).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
