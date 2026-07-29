---
title: "Add SEP-24 deposit/withdrawal helpers"
labels: ["enhancement", "good first issue"]
---

## Description

Implement SEP-24 (Anchor/Asset Exchange) deposit and withdrawal helper functions. SEP-24 allows users to deposit and withdraw assets through anchors using the Stellar network.

## Acceptance Criteria

- [ ] `deposit()` function that constructs and submits a SEP-24 deposit request
- [ ] `withdraw()` function that constructs and submits a SEP-24 withdrawal request
- [ ] TypeScript types for SEP-24 request/response data
- [ ] Unit tests for both functions
- [ ] Documentation with usage examples

## Resources

- [SEP-24 Specification](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0024.md)
- See `lib/stellar/sep10.ts` for the existing SEP-10 implementation as a reference
