---
title: "Add integration tests with Stellar testnet"
labels: ["testing", "enhancement"]
---

## Description

Write integration tests that run against the actual Stellar testnet. These will validate that the library works end-to-end with real network operations.

## Acceptance Criteria

- [ ] Test account creation and funding via Friendbot
- [ ] Test XLM payment between two accounts
- [ ] Test custom asset payment with trustline
- [ ] Test fee-bump transaction
- [ ] Tests are marked with `@integration` and can be skipped in CI
- [ ] Documentation on how to run integration tests

## Resources

- See `lib/__tests__/` for unit test patterns
- Uses vitest
- Testnet Friendbot URL: `https://friendbot.stellar.org`
