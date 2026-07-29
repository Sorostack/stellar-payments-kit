.PHONY: all install build test lint fmt check clean

all: install build

# TypeScript
install:
	npm install

dev:
	npm run dev

build:
	npm run build

test:
	npm test

test-watch:
	npm run test:watch

lint:
	npm run lint

typecheck:
	npm run typecheck

format:
	npm run format

# Rust
rust-build:
	cargo build --release --target wasm32-unknown-unknown

rust-test:
	cargo test --all-features

rust-fmt:
	cargo fmt --all

rust-clippy:
	cargo clippy --all-targets --all-features -- -D warnings

rust-check:
	cargo check --all-features

rust-clean:
	cargo clean

# All
check: lint typecheck rust-clippy rust-fmt
	npm run check

ci: check test rust-test

clean:
	rm -rf .next coverage target
