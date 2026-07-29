export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface BucketEntry {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private buckets = new Map<string, BucketEntry>();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const entry = this.buckets.get(key);

    if (!entry || now > entry.resetAt) {
      this.buckets.set(key, { count: 1, resetAt: now + this.config.windowMs });
      return true;
    }

    if (entry.count >= this.config.maxRequests) return false;

    entry.count++;
    return true;
  }

  getRemaining(key: string): number {
    const entry = this.buckets.get(key);
    if (!entry || Date.now() > entry.resetAt) return this.config.maxRequests;
    return Math.max(0, this.config.maxRequests - entry.count);
  }

  getResetTime(key: string): number | null {
    const entry = this.buckets.get(key);
    return entry?.resetAt ?? null;
  }

  clear(): void {
    this.buckets.clear();
  }
}
