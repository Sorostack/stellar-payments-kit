# Integration Guide

## Web Applications

```typescript
import { createPayment } from "stellar-payments-kit";

app.post("/api/pay", async (req, res) => {
  const tx = await createPayment(req.body);
  res.json({ hash: tx });
});
```

## Mobile

Use with React Native via the `stellar-sdk` mobile bindings.

## Backend Services

Integrate with existing Node.js services by importing the library.
