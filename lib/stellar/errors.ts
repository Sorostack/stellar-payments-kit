export class StellarError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = "StellarError";
  }
}

export class ValidationError extends StellarError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

export class NetworkError extends StellarError {
  constructor(message: string, statusCode: number = 502) {
    super(message, "NETWORK_ERROR", statusCode);
    this.name = "NetworkError";
  }
}

export class NotFoundError extends StellarError {
  constructor(resource: string) {
    super(`${resource} not found`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class RateLimitError extends StellarError {
  constructor(retryAfterMs: number) {
    super("Rate limit exceeded", "RATE_LIMITED", 429);
    this.name = "RateLimitError";
  }
}
