export const STELLAR_CONSTANTS = {
  MAX_INT64: "9223372036854775807",
  MIN_INT64: "-9223372036854775808",
  BASE_FEE: "100",
  MEMO_MAX_LENGTH: 28,
  ASSET_CODE_MAX_LENGTH: 12,
  PUBLIC_KEY_LENGTH: 56,
  SECRET_KEY_LENGTH: 56,
  OPERATION_NAME_LOOKUP: true,
} as const;

export const NETWORK_PASSPHRASES = {
  public: "Public Global Stellar Network ; September 2015",
  testnet: "Test SDF Network ; September 2015",
  futurenet: "Future Network ; October 2022",
} as const;

export const CONTRACT_EVENTS = {
  TRANSFER: "transfer",
  MINT: "mint",
  BURN: "burn",
  APPROVAL: "approval",
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
} as const;

export const ERROR_CODES = {
  INVALID_PUBLIC_KEY: "ERR_INVALID_PUBLIC_KEY",
  INVALID_SECRET_KEY: "ERR_INVALID_SECRET_KEY",
  INVALID_AMOUNT: "ERR_INVALID_AMOUNT",
  INVALID_ASSET: "ERR_INVALID_ASSET",
  INVALID_MEMO: "ERR_INVALID_MEMO",
  NETWORK_ERROR: "ERR_NETWORK",
  TIMEOUT: "ERR_TIMEOUT",
  NOT_FOUND: "ERR_NOT_FOUND",
  RATE_LIMITED: "ERR_RATE_LIMITED",
} as const;
