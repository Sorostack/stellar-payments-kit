export interface WebhookConfig {
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
}

export function createWebhook(config: WebhookConfig): WebhookConfig {
  return { ...config, enabled: true };
}

export function validateWebhookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function formatWebhookPayload(event: string, data: unknown): string {
  return JSON.stringify({ event, data, timestamp: Date.now() });
}
