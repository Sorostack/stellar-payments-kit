# Security Practices

## Key Management

- Use `Keypair.random()` for ephemeral keys
- Store persistent keys encrypted
- Never log secret keys

## Transaction Security

- Verify transaction envelopes before signing
- Use proper sequence numbers
- Set appropriate timebounds

## Reporting

Report vulnerabilities to security@stellar-payments-kit.dev.
