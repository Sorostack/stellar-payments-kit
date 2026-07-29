# Architecture

## Overview

stellar-payments-kit is a TypeScript library built on Stellar SDK.

## Module Structure

- `lib/stellar/` — Core modules organized by concern
  - `accounts.ts` — Account creation and management
  - `transactions.ts` — Payment operations
  - `network.ts` — Network configuration
  - `soroban-contract.ts` — Smart contract interactions
  - `amm.ts` — Automated Market Maker operations
  - `lending.ts` — Lending protocol integration
  - `staking.ts` — Staking operations
  - `nft.ts` — NFT management
  - `anchor.ts` — Anchor/SEP integration
  - And more...

## Patterns

- Async functions with params objects
- Network parameter defaults to testnet
- Error handling via custom `StellarError` classes
- barrel export via `lib/stellar/index.ts`
