export interface AnalyticsEvent {
  name: string;
  properties: Record<string, unknown>;
  timestamp: number;
}

export class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];
  private enabled: boolean = true;

  track(name: string, properties?: Record<string, unknown>): void {
    if (!this.enabled) return;
    this.events.push({
      name,
      properties: properties ?? {},
      timestamp: Date.now(),
    });
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clear(): void {
    this.events = [];
  }

  disable(): void {
    this.enabled = false;
  }

  enable(): void {
    this.enabled = true;
  }

  summarize(): Record<string, number> {
    const summary: Record<string, number> = {};
    for (const event of this.events) {
      summary[event.name] = (summary[event.name] ?? 0) + 1;
    }
    return summary;
  }
}

export const analytics = new AnalyticsTracker();
