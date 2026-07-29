import { describe, it, expect } from "vitest";
import { createNotification, markAsRead, filterUnread } from "@/lib/stellar/notifications";

describe("Notifications", () => {
  it("creates notification", () => {
    const n = createNotification("payment", "Payment received", "You got 100 XLM");
    expect(n.type).toBe("payment");
    expect(n.read).toBe(false);
  });

  it("marks as read", () => {
    const n = createNotification("alert", "Test", "Msg");
    const read = markAsRead(n);
    expect(read.read).toBe(true);
  });

  it("filters unread", () => {
    const n1 = createNotification("payment", "A", "Msg");
    const n2 = markAsRead(createNotification("update", "B", "Msg"));
    expect(filterUnread([n1, n2])).toHaveLength(1);
  });
});
