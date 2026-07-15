# Stellar Payments Kit

A lightweight, developer-friendly toolkit for building payment flows on the [Stellar](https://stellar.org) network. It wraps the [`@stellar/stellar-sdk`](https://github.com/stellar/js-stellar-sdk) to provide simple, composable utilities for common payment operations — account creation, asset transfers, transaction building, and fee-bump transactions — all with a clean TypeScript API.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Open Issues](https://img.shields.io/github/issues/Sorostack/stellar-payments-kit)](https://github.com/Sorostack/stellar-payments-kit/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## Why Stellar Payments Kit?

Working directly with `stellar-sdk` means writing a lot of boilerplate — loading accounts, constructing `TransactionBuilder` objects, managing fee estimation, handling testnet vs mainnet switching, and more. This kit abstracts that away so you can focus on your product logic.

**Key goals:**
- Minimal API surface — do the most common things in one line
- TypeScript-first with full type inference
- Supports both Testnet (Futurenet) and Mainnet
- Built on top of the official `@stellar/stellar-sdk` — no hidden magic
- Interactive demo UI included

---

## Features

- **Account funding** — fund Testnet accounts via Friendbot with a single call
- **XLM transfers** — send native XLM between accounts with automatic fee estimation
- **Custom asset payments** — issue and transfer custom Stellar assets
- **Transaction building** — fluent helpers for constructing and signing transactions
- **Fee-bump transactions** — wrap existing transactions to pay fees on behalf of users
- **Network switching** — toggle between Testnet and Mainnet at runtime
- **Interactive UI** — explore all features via the built-in Next.js demo app

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/Sorostack/stellar-payments-kit.git
cd stellar-payments-kit
npm install
```

### Run the demo app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the interactive demo.

### Build for production

```bash
npm run build
npm start
```

---

## Usage

### Fund a Testnet account

```typescript
import { fundTestnetAccount } from "@/lib/stellar/accounts";

const keypair = await fundTestnetAccount();
console.log("Public Key:", keypair.publicKey());
console.log("Secret Key:", keypair.secret());
```

### Send XLM

```typescript
import { sendPayment } from "@/lib/stellar/payments";

await sendPayment({
  sourceSecret: "S...",
  destinationPublicKey: "G...",
  amount: "10",
  network: "testnet",
});
```

### Send a custom asset

```typescript
import { sendAssetPayment } from "@/lib/stellar/payments";

await sendAssetPayment({
  sourceSecret: "S...",
  destinationPublicKey: "G...",
  assetCode: "USDC",
  assetIssuer: "G...",
  amount: "5.00",
  network: "testnet",
});
```

### Build a fee-bump transaction

```typescript
import { buildFeeBumpTransaction } from "@/lib/stellar/transactions";

const feeBumpTx = await buildFeeBumpTransaction({
  feeSourceSecret: "S...",
  innerTransactionXdr: "...",
  network: "testnet",
});
```

---

## Project Structure

```
stellar-payments-kit/
├── app/                    # Next.js app (demo UI)
│   ├── layout.tsx
│   ├── page.tsx            # Interactive demo home
│   └── globals.css
├── lib/
│   └── stellar/
│       ├── accounts.ts     # Account creation & funding helpers
│       ├── payments.ts     # XLM & asset payment helpers
│       ├── transactions.ts # Transaction building & fee-bump
│       └── network.ts      # Network configuration (testnet/mainnet)
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
├── FUNDING.json
└── LICENSE
```

---

## Contributing

Contributions are welcome and appreciated! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to open issues, propose features, and submit pull requests.

---

## Roadmap

- [ ] Soroban smart contract invocation helpers
- [ ] SEP-10 authentication flow
- [ ] SEP-24 deposit/withdrawal helpers
- [ ] Batch payment utilities
- [ ] React hooks package (`stellar-payments-kit/react`)

---

## License

[MIT](LICENSE) © Sorostack
