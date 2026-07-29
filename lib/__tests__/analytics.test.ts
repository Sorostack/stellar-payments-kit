import { describe, it, expect } from "vitest";
import { AnalyticsTracker } from "@/lib/stellar/analytics";

describe("AnalyticsTracker", () => {
  it("tracks events", () => {
    const tracker = new AnalyticsTracker();
    tracker.track("page_view", { page: "/home" });
    expect(tracker.getEvents()).toHaveLength(1);
  });

  it("summarizes events", () => {
    const tracker = new AnalyticsTracker();
    tracker.track("click");
    tracker.track("click");
    const summary = tracker.summarize();
    expect(summary.click).toBe(2);
  });

  it("clears events", () => {
    const tracker = new AnalyticsTracker();
    tracker.track("test");
    tracker.clear();
    expect(tracker.getEvents()).toHaveLength(0);
  });

  it("disables tracking", () => {
    const tracker = new AnalyticsTracker();
    tracker.disable();
    tracker.track("test");
    expect(tracker.getEvents()).toHaveLength(0);
  });
});
