# Architecture

Stellar Payments Kit is organized as a monorepo with two main components:

## TypeScript Library (`lib/stellar/`)
Core payment utilities wrapping `@stellar/stellar-sdk`:

- `network.ts` — Horizon server factory, network config
- `accounts.ts` — Keypair generation, Friendbot funding
- `payments.ts` — XLM and custom asset payments
- `transactions.ts` — Fee-bump, XDR decoder, explorer URL
- `validation.ts` — Input validation helpers
- `errors.ts` — Typed error classes
- `tx-status.ts` — Transaction status polling
- `batch.ts` — Multi-payment batching
- `sep10.ts` — SEP-10 authentication flow
- `soroban.ts` — Soroban contract invocation

## Rust Soroban Contracts (`contracts/`)

- `escrow` — Trustless escrow with depositor/beneficiary/arbiter
- `token-swap` — Atomic token swap between two parties
- `payment-splitter` — Distribute payments proportionally

## Next.js Demo App (`app/`)
Interactive UI for exploring the library on Testnet.
