# Deployment

## Production

1. Build: `npm run build`
2. Publish: `npm publish`

## Docker

```bash
docker build -t stellar-payments-kit .
docker run stellar-payments-kit
```

## CI/CD

Pre-configured GitHub Actions workflows handle linting, testing, and publishing.
