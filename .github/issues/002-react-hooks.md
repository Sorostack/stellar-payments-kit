---
title: "Create React hooks package (`stellar-payments-kit/react`)"
labels: ["enhancement", "good first issue"]
---

## Description

Create a separate entry point `@/lib/react` (or a future package) with React hooks that wrap the core Stellar operations. This would make it easy for React developers to integrate Stellar payments.

## Acceptance Criteria

- [ ] `useKeypair()` hook for generating and managing keypairs
- [ ] `usePayment()` hook for sending payments with loading/error state
- [ ] `useAccountInfo()` hook for fetching account data
- [ ] Each hook follows React best practices (proper cleanup, error boundaries)
- [ ] Unit tests for each hook using React Testing Library

## Resources

- See `app/page.tsx` for the existing UI patterns
- Reference: existing hooks in the Next.js ecosystem
