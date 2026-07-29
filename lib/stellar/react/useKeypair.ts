"use client";
import { useState, useCallback } from "react";
import { generateKeypair } from "../accounts";

interface KeypairState {
  publicKey: string;
  secretKey: string;
}

export function useKeypair() {
  const [keypair, setKeypair] = useState<KeypairState | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = useCallback(() => {
    setLoading(true);
    const result = generateKeypair();
    setKeypair(result);
    setLoading(false);
    return result;
  }, []);

  return { keypair, loading, generate };
}
