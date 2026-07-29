import { StellarNetwork } from "./network";

export interface PaymentStreamConfig {
  sourceSecret: string;
  destinationPublicKey: string;
  totalAmount: string;
  durationMs: number;
  intervalMs: number;
  network?: StellarNetwork;
}

export class PaymentStream {
  private config: PaymentStreamConfig;
  private sentAmount = "0";
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private _onProgress?: (sent: string, total: string) => void;
  private _onComplete?: () => void;

  constructor(config: PaymentStreamConfig) {
    this.config = config;
  }

  onProgress(cb: (sent: string, total: string) => void): void {
    this._onProgress = cb;
  }

  onComplete(cb: () => void): void {
    this._onComplete = cb;
  }

  async start(): Promise<void> {
    const intervals = this.config.durationMs / this.config.intervalMs;
    const perInterval = (Number(this.config.totalAmount) / intervals).toFixed(7);

    this.intervalId = setInterval(async () => {
      if (Number(this.sentAmount) >= Number(this.config.totalAmount)) {
        this.stop();
        this._onComplete?.();
        return;
      }

      try {
        const { sendPayment } = await import("./payments");
        const result = await sendPayment({
          sourceSecret: this.config.sourceSecret,
          destinationPublicKey: this.config.destinationPublicKey,
          amount: perInterval,
          network: this.config.network,
        });
        this.sentAmount = String(Number(this.sentAmount) + Number(perInterval));
        this._onProgress?.(this.sentAmount, this.config.totalAmount);
      } catch {
        this.stop();
      }
    }, this.config.intervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getProgress(): { sent: string; total: string; remaining: string } {
    const remaining = Math.max(0, Number(this.config.totalAmount) - Number(this.sentAmount));
    return {
      sent: this.sentAmount,
      total: this.config.totalAmount,
      remaining: String(remaining),
    };
  }
}
