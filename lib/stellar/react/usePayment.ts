"use client";
import { useState, useCallback } from "react";
import { sendPayment, PaymentParams, PaymentResult } from "../payments";

interface PaymentState {
  result: PaymentResult | null;
  error: string | null;
  loading: boolean;
}

export function usePayment() {
  const [state, setState] = useState<PaymentState>({
    result: null,
    error: null,
    loading: false,
  });

  const send = useCallback(async (params: PaymentParams) => {
    setState({ result: null, error: null, loading: true });
    try {
      const result = await sendPayment(params);
      setState({ result, error: null, loading: false });
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setState({ result: null, error: msg, loading: false });
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ result: null, error: null, loading: false });
  }, []);

  return { ...state, send, reset };
}
