# Testing Guide

## Unit Tests
```bash
npm test           # Run all tests
npm run test:watch # Watch mode
npm run test:coverage # With coverage
```

## Rust Tests
```bash
cargo test --all-features
cargo test --doc
```

## Running Specific Tests
```bash
npx vitest run lib/__tests__/network.test.ts
cargo test -p escrow-contract
```

## Writing Tests
Place test files in `lib/__tests__/` with `.test.ts` extension.
Use Vitest globals (`describe`, `it`, `expect`).

Example:
```typescript
import { describe, it, expect } from "vitest";
import { myFunction } from "@/lib/stellar/my-module";

describe("myFunction", () => {
  it("does something", () => {
    expect(myFunction()).toBe(true);
  });
});
```
