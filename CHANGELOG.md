# Changelog

All notable changes to this project will be documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project uses [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Planned
- Soroban smart contract invocation helpers
- SEP-10 authentication flow
- SEP-24 deposit/withdrawal helpers
- Batch payment utilities
- React hooks package

---

## [0.1.0] - 2024-12-01

### Added
- Initial project setup with Next.js 16 and TypeScript
- `lib/stellar/network.ts` — network config and Horizon server factory for Testnet and Mainnet
- `lib/stellar/accounts.ts` — keypair generation, Friendbot funding, account info, existence check
- `lib/stellar/payments.ts` — XLM payments, custom asset payments, trustline management
- `lib/stellar/transactions.ts` — fee-bump transaction builder, XDR decoder, Stellar Expert explorer links
- Interactive demo UI with tabbed interface (keypair generator, fund account, send XLM, account info)
- README with full usage documentation and examples
- CONTRIBUTING.md with development setup and PR guidelines
- CODE_OF_CONDUCT.md (Contributor Covenant 2.1)
- FUNDING.json for Drips dependency funding
- MIT License
- GitHub issue templates (bug report, feature request)

[Unreleased]: https://github.com/Sorostack/stellar-payments-kit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Sorostack/stellar-payments-kit/releases/tag/v0.1.0
