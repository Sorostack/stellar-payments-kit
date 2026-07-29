import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePayment } from "@/lib/stellar/react/usePayment";

describe("usePayment", () => {
  it("initializes with default state", () => {
    const { result } = renderHook(() => usePayment());
    expect(result.current.loading).toBe(false);
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
