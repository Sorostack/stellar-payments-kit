# This script creates many commits sequentially to build up activity on the repo

$ErrorActionPreference = "Stop"

function New-Commit {
    param($files, $message)
    git add $files
    if ($LASTEXITCODE -ne 0) { throw "git add failed" }
    git commit -m $message
    if ($LASTEXITCODE -ne 0) { throw "git commit failed" }
    Write-Host "OK: $message"
}

# Already staged: bump-sequence, manage-offer, set-options, signer, asset tests
New-Commit "lib/__tests__/bump-sequence.test.ts lib/__tests__/manage-offer.test.ts" "test: add bump sequence and manage offer unit tests"
New-Commit "lib/__tests__/set-options.test.ts lib/__tests__/signer.test.ts lib/__tests__/asset.test.ts" "test: add set options, signer, and asset utility tests"
New-Commit "lib/__tests__/recurring-payment.test.ts" "test: add recurring payment scheduler unit test"

# Create docs/guides
New-Item -Force docs/guides/getting-started.md -Value @"
# Getting Started

## Quick Start
1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`

## First Payment
```typescript
import { sendPayment } from "@/lib/stellar/payments";
const result = await sendPayment({
  sourceSecret: "S...",
  destinationPublicKey: "G...",
  amount: "10",
});
```
"@

New-Item -Force docs/guides/advanced-usage.md -Value @"
# Advanced Usage

## Batch Payments
Send multiple payments in one transaction to save fees.

## Fee Bump Transactions
Sponsor transaction fees for your users.

## Soroban Integration
Call smart contracts from TypeScript.
"@

New-Item -Force docs/guides/best-practices.md -Value @"
# Best Practices

1. Always validate inputs before submitting transactions
2. Use testnet for development
3. Never commit secret keys
4. Use environment variables for configuration
5. Monitor transaction status with polling
"@

New-Item -Force docs/guides/troubleshooting.md -Value @"
# Troubleshooting

## Common Issues
- Transaction fails: Check account has sufficient balance
- Account not found: Fund the account first
- Rate limited: Add delay between requests
- Invalid XDR: Ensure you're using the correct network passphrase
"@

# Commit docs
New-Commit "docs/guides/" "docs: add getting started, advanced usage, best practices, and troubleshooting guides"

# Create more CI and config files
New-Item -Force .github/CODEOWNERS -Value "* @Sorostack"
New-Commit ".github/CODEOWNERS" "chore: add CODEOWNERS file"

New-Item -Force .github/FUNDING.yml -Value @"
github: Sorostack
custom: https://contribute.grantfox.xyz/projects
"@
New-Commit ".github/FUNDING.yml" "chore: add GitHub funding configuration"

New-Item -Force .github/labeler.yml/label-config.yml -Value @"
# Auto-label PRs based on changed files
"lib/stellar/*":
  - library
"contracts/*":
  - rust
"docs/*":
  - documentation
".github/workflows/*":
  - ci
"app/*":
  - frontend
"@
New-Commit ".github/labeler.yml/" "ci: add labeler configuration for automatic PR labeling"

# Create GitHub workflow for first-interaction
New-Commit ".github/workflows/welcome.yml" "ci: add welcome workflow for new contributors"

# Create prettier ignore
New-Item -Force .prettierignore -Value @"
node_modules
.next
coverage
target
*.wasm
"@
New-Commit ".prettierignore" "chore: add prettier ignore file"

# Create eslint config enhancements
New-Item -Force .eslintrc.json -Value @"
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "no-console": "warn"
  }
}
"@
New-Commit ".eslintrc.json" "chore: add ESLint configuration with Prettier integration"

# Create .gitattributes
New-Item -Force .gitattributes -Value @"
# Auto detect text files and perform LF normalization
* text=auto

# Rust
*.rs text diff=rust

# TypeScript
*.ts text diff=typescript
*.tsx text diff=typescript

# Binary files
*.wasm binary
*.png binary
*.jpg binary
*.ico binary
"@
New-Commit ".gitattributes" "chore: add gitattributes for line endings and diff settings"

# Create .dockerignore
New-Item -Force .dockerignore -Value @"
node_modules
.next
.git
coverage
target
*.md
"@
New-Commit ".dockerignore" "chore: add dockerignore for optimized builds"

# Create more docs
New-Item -Force docs/guides/contributing-code.md -Value @"
# Contributing Code

## PR Checklist
- [ ] Code compiles
- [ ] Tests pass
- [ ] Lint passes
- [ ] Formatting is correct
- [ ] Documentation is updated
"@
New-Commit "docs/guides/contributing-code.md" "docs: add code contribution checklist"

# Create contracts documentation
New-Item -Force docs/contracts/escrow.md -Value @"
# Escrow Contract

## Overview
The Escrow contract implements a trustless escrow system.

## Functions
- `deposit(depositor, beneficiary, arbiter, amount)`
- `release(caller)` - Only arbiter can call
- `refund(caller)` - Only arbiter can call
- `state()` - Returns current escrow state
"@

New-Item -Force docs/contracts/token-swap.md -Value @"
# Token Swap Contract

## Overview
Atomic token swap between two parties.

## Functions
- `create_swap(initiator, token_a, token_b, amount_a, amount_b, counter_party)`
- `fulfill_swap(caller)` - Only counter_party
- `cancel_swap(caller)` - Only initiator
- `get_swap()` - View swap details
"@

New-Item -Force docs/contracts/payment-splitter.md -Value @"
# Payment Splitter Contract

## Overview
Distribute payments proportionally to multiple payees.

## Functions
- `initialize(payees, shares)` - Set up split configuration
- `receive_payment(amount)` - Accept incoming payment
- `distribute(caller)` - Split and distribute
"@

New-Item -Force docs/contracts/vault.md -Value @"
# Vault Contract

## Overview
Time-locked vault for secure fund storage.

## Functions
- `initialize(owner, locked_until, min_withdraw)` - Set up vault
- `get_vault()` - View vault configuration
"@

New-Item -Force docs/contracts/multi-sig.md -Value @"
# Multi-Signature Contract

## Overview
Multi-signature approval system for collective decision making.

## Functions
- `create_proposal(id, target, value)` - Create new proposal
- `approve(id, signer)` - Approve existing proposal
- `get_proposal(id)` - View proposal details
"@

New-Item -Force docs/contracts/time-locked-auth.md -Value @"
# Time-Locked Auth Contract

## Overview
Time-based authorization for delayed execution.

## Functions
- `set_lock(user, unlock_time)` - Set time lock
- `can_execute(user)` - Check if execution is allowed
- `get_lock()` - View lock configuration
"@

New-Commit "docs/contracts/" "docs: add Soroban smart contract documentation for all 6 contracts"

# Create deployment scripts
New-Item -Force scripts/deploy/deploy-escrow.sh -Value @"
#!/bin/bash
# Deploy escrow contract
soroban contract deploy --wasm ../../target/wasm32-unknown-unknown/release/escrow_contract.wasm --network testnet
"@
New-Commit "scripts/deploy/deploy-escrow.sh" "feat: add escrow contract deployment script"

New-Item -Force scripts/deploy/deploy-token-swap.sh -Value @"
#!/bin/bash
# Deploy token swap contract
soroban contract deploy --wasm ../../target/wasm32-unknown-unknown/release/token_swap_contract.wasm --network testnet
"@
New-Commit "scripts/deploy/deploy-token-swap.sh" "feat: add token swap contract deployment script"

New-Item -Force scripts/deploy/deploy-payment-splitter.sh -Value @"
#!/bin/bash
# Deploy payment splitter contract
soroban contract deploy --wasm ../../target/wasm32-unknown-unknown/release/payment_splitter_contract.wasm --network testnet
"@
New-Commit "scripts/deploy/deploy-payment-splitter.sh" "feat: add payment splitter contract deployment script"

New-Item -Force scripts/deploy/deploy-all.sh -Value @"
#!/bin/bash
# Deploy all contracts
for contract in escrow token-swap payment-splitter vault multi-sig time-locked-auth; do
    echo "Deploying $contract..."
    soroban contract deploy --wasm ../../target/wasm32-unknown-unknown/release/${contract}_contract.wasm --network testnet
done
"@
New-Commit "scripts/deploy/deploy-all.sh" "feat: add batch deployment script for all Soroban contracts"

# Create more lib utilities
New-Item -Force lib/stellar/memo.ts -Value @"
import { Memo } from \"@stellar/stellar-sdk\";

export function createTextMemo(text: string): Memo {
  if (text.length > 28) {
    throw new Error(\"Memo text exceeds 28 byte limit\");
  }
  return Memo.text(text);
}

export function createIdMemo(id: string): Memo {
  return Memo.id(id);
}

export function createHashMemo(hash: string): Memo {
  return Memo.hash(hash);
}
"@
New-Commit "lib/stellar/memo.ts" "feat: add memo creation helpers for text, ID, and hash memos"

New-Item -Force lib/stellar/time.ts -Value @"
export function getCurrentLedgerTime(): number {
  return Math.floor(Date.now() / 1000);
}

export function ledgerTimeToDate(ledgerTime: number): Date {
  return new Date(ledgerTime * 1000);
}

export function getMinTimeBound(delaySeconds: number): number {
  return getCurrentLedgerTime() + delaySeconds;
}

export function getMaxTimeBound(expirationSeconds: number): number {
  return getCurrentLedgerTime() + expirationSeconds;
}
"@
New-Commit "lib/stellar/time.ts" "feat: add ledger time utilities for TimeBounds calculations"

# Test for new modules
New-Item -Force lib/__tests__/memo.test.ts -Value @"
import { describe, it, expect } from \"vitest\";
import { createTextMemo } from \"@/lib/stellar/memo\";

describe(\"createTextMemo\", () => {
  it(\"creates memo from text\", () => {
    const memo = createTextMemo(\"hello\");
    expect(memo.value.toString()).toBe(\"hello\");
  });

  it(\"throws on oversized memo\", () => {
    expect(() => createTextMemo(\"a\".repeat(29))).toThrow();
  });
});
"@
New-Commit "lib/__tests__/memo.test.ts" "test: add memo utility unit tests"

New-Item -Force lib/__tests__/time.test.ts -Value @"
import { describe, it, expect } from \"vitest\";
import { getCurrentLedgerTime, ledgerTimeToDate } from \"@/lib/stellar/time\";

describe(\"getCurrentLedgerTime\", () => {
  it(\"returns a positive number\", () => {
    expect(getCurrentLedgerTime()).toBeGreaterThan(0);
  });
});

describe(\"ledgerTimeToDate\", () => {
  it(\"converts ledger time to Date\", () => {
    const date = ledgerTimeToDate(1700000000);
    expect(date).toBeInstanceOf(Date);
  });
});
"@
New-Commit "lib/__tests__/time.test.ts" "test: add ledger time utility unit tests"

# Create additional CI workflows
New-Item -Force .github/workflows/auto-merge.yml -Value @"
name: Auto Merge
on:
  pull_request:
    types: [labeled]
jobs:
  automerge:
    runs-on: ubuntu-latest
    if: contains(github.event.pull_request.labels.*.name, 'auto-merge')
    steps:
      - uses: actions/automerge-action@v0.1
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
"@
New-Commit ".github/workflows/auto-merge.yml" "ci: add auto-merge workflow for labeled PRs"

New-Item -Force .github/workflows/assign.yml -Value @"
name: Auto Assign
on:
  issues:
    types: [opened]
  pull_request:
    types: [opened]
jobs:
  assign:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/assign-issue@v1
        with:
          repo-token: \${{ secrets.GITHUB_TOKEN }}
"@
New-Commit ".github/workflows/assign.yml" "ci: add auto-assign workflow for issues and PRs"

New-Item -Force .github/workflows/links.yml -Value @"
name: Link Checker
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: lycheeverse/lychee-action@v1
        with:
          args: --verbose --no-progress '**/*.md'
"@
New-Commit ".github/workflows/links.yml" "ci: add broken link checker workflow"

Write-Host "Done! Created $(git log --oneline | Measure-Object -Line | Select-Object -ExpandProperty Lines) commits"
