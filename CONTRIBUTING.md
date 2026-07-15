# Contributing to Stellar Payments Kit

Thank you for your interest in contributing! This project is open to all skill levels — whether you're fixing a typo, improving docs, or adding new Stellar payment features, every contribution matters.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

---

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it. Please report unacceptable behavior to the maintainers via GitHub issues.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/stellar-payments-kit.git
   cd stellar-payments-kit
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create a branch** for your work:
   ```bash
   git checkout -b feat/your-feature-name
   ```

---

## How to Contribute

### Reporting Bugs

Before opening a bug report, please search existing [issues](https://github.com/Sorostack/stellar-payments-kit/issues) to avoid duplicates.

When filing a bug, include:
- A clear, descriptive title
- Steps to reproduce the problem
- What you expected to happen vs. what actually happened
- Your environment (OS, Node.js version, browser if relevant)
- Any relevant error messages or stack traces

Use the **Bug Report** issue template when available.

### Suggesting Features

Feature requests are welcome. Please open an issue with:
- A clear description of the proposed feature
- The use case or problem it solves
- Any relevant examples from other projects

### Submitting Pull Requests

1. Make sure your branch is up to date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. Write or update tests for your change where applicable
3. Run the linter before pushing:
   ```bash
   npm run lint
   ```
4. Open a pull request against `main` with:
   - A clear title (see [commit messages](#commit-messages) below)
   - A description of what changed and why
   - A reference to any related issue (e.g. `Closes #42`)

Pull requests are reviewed by maintainers. Small, focused PRs are merged faster than large ones — try to keep each PR to a single concern.

---

## Development Setup

```bash
# Run the demo app in development mode
npm run dev

# Build for production
npm run build

# Lint the codebase
npm run lint
```

The demo app runs at [http://localhost:3000](http://localhost:3000).

---

## Coding Standards

- **TypeScript** — all new code must be TypeScript with proper types. Avoid `any`.
- **Formatting** — follow the existing code style. ESLint is configured — run `npm run lint` before committing.
- **Comments** — add JSDoc comments to all exported functions and types.
- **Error handling** — always handle errors explicitly; don't swallow exceptions silently.
- **Security** — never commit private keys, secrets, or `.env` values. Use Testnet keypairs in examples.

---

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>

[optional body]

[optional footer — e.g. Closes #123]
```

Common types:
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `refactor` — code change that is neither a fix nor a feature
- `chore` — build process, tooling changes
- `test` — adding or fixing tests

**Examples:**
```
feat(payments): add fee-bump transaction builder
fix(accounts): handle Friendbot rate limit error gracefully
docs(readme): add custom asset payment example
```

---

## Questions?

If you're unsure about anything, open a [discussion](https://github.com/Sorostack/stellar-payments-kit/discussions) or comment on the relevant issue. We're happy to help!
