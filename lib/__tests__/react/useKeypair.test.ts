import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useKeypair } from "@/lib/stellar/react/useKeypair";

describe("useKeypair", () => {
  it("generates a keypair", () => {
    const { result } = renderHook(() => useKeypair());
    expect(result.current.keypair).toBeNull();

    act(() => {
      result.current.generate();
    });

    expect(result.current.keypair).not.toBeNull();
    expect(result.current.keypair?.publicKey).toMatch(/^G/);
  });
});
