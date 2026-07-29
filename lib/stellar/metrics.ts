export interface MetricEvent {
  name: string;
  value: number;
  tags?: Record<string, string>;
  timestamp: number;
}

export class MetricsCollector {
  private events: MetricEvent[] = [];
  private counters = new Map<string, number>();

  increment(name: string, tags?: Record<string, string>): void {
    const key = name + (tags ? JSON.stringify(tags) : "");
    this.counters.set(key, (this.counters.get(key) ?? 0) + 1);
    this.record(name, 1, tags);
  }

  record(name: string, value: number, tags?: Record<string, string>): void {
    this.events.push({ name, value, tags, timestamp: Date.now() });
  }

  getCounter(name: string, tags?: Record<string, string>): number {
    const key = name + (tags ? JSON.stringify(tags) : "");
    return this.counters.get(key) ?? 0;
  }

  flush(): MetricEvent[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }

  getEvents(): MetricEvent[] {
    return [...this.events];
  }
}

export const globalMetrics = new MetricsCollector();
