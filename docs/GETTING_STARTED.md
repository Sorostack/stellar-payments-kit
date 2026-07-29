# Getting Started

## Installation

```bash
npm install stellar-payments-kit
```

## Quick Start

```typescript
import { Keypair } from "@stellar/stellar-sdk";
import { createPayment } from "stellar-payments-kit";

const sender = Keypair.random();
const tx = await createPayment({
  sourceSecret: sender.secret(),
  destination: "G...",
  amount: "10",
  network: "testnet",
});
```

## Next Steps

- See examples/ for full usage examples
- Read docs/ for detailed guides
