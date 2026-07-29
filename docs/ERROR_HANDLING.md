# Error Handling

## Error Classes

The library provides custom error classes in `errors.ts`:

- `StellarError` — Base error class
- `NetworkError` — Network connectivity issues
- `ValidationError` — Input validation failures
- `TransactionError` — Transaction submission failures
- `AccountError` — Account-related errors

## Best Practices

```typescript
import { StellarError, NetworkError } from "./errors";

try {
  const result = await createPayment(params);
} catch (error) {
  if (error instanceof NetworkError) {
    // Retry logic
  } else if (error instanceof ValidationError) {
    // Input correction
  } else {
    // Generic handling
  }
}
```
