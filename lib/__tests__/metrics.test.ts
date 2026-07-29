import { describe, it, expect } from "vitest";
import { MetricsCollector } from "@/lib/stellar/metrics";

describe("MetricsCollector", () => {
  it("increments counters", () => {
    const metrics = new MetricsCollector();
    metrics.increment("requests");
    metrics.increment("requests");
    metrics.increment("errors", { type: "timeout" });
    expect(metrics.getCounter("requests")).toBe(2);
    expect(metrics.getCounter("errors", { type: "timeout" })).toBe(1);
  });

  it("records events", () => {
    const metrics = new MetricsCollector();
    metrics.record("latency", 42);
    expect(metrics.getEvents()).toHaveLength(1);
  });

  it("flushes events", () => {
    const metrics = new MetricsCollector();
    metrics.record("latency", 42);
    const flushed = metrics.flush();
    expect(flushed).toHaveLength(1);
    expect(metrics.getEvents()).toHaveLength(0);
  });
});
