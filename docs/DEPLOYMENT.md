# Deployment Guide

## TypeScript Library

The library is consumed directly from source via path aliases. No build step required.

## Next.js App

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js host.

## Soroban Contracts

```bash
cargo build --release --target wasm32-unknown-unknown
```

The `.wasm` files will be in `target/wasm32-unknown-unknown/release/`.

Deploy contracts using the Stellar CLI or Soroban CLI:
```bash
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/escrow_contract.wasm
```
