export class StellarPaymentError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "StellarPaymentError";
  }
}

export function isNotFoundError(error: unknown): boolean {
  if (error instanceof StellarPaymentError) {
    return error.code === "ACCOUNT_NOT_FOUND";
  }
  return false;
}

export function isInsufficientBalanceError(error: unknown): boolean {
  if (error instanceof StellarPaymentError) {
    return error.code === "INSUFFICIENT_BALANCE";
  }
  return false;
}
