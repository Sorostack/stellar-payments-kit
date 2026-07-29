export interface StellarConfig {
  horizonUrl?: string;
  networkPassphrase?: string;
  defaultFee?: string;
  timeoutMs?: number;
  allowHttp?: boolean;
}

export const defaultConfig: StellarConfig = {
  horizonUrl: "https://horizon-testnet.stellar.org",
  networkPassphrase: "Test SDF Network ; September 2015",
  defaultFee: "100",
  timeoutMs: 30000,
  allowHttp: false,
};

let currentConfig: StellarConfig = { ...defaultConfig };

export function configure(config: Partial<StellarConfig>): void {
  currentConfig = { ...currentConfig, ...config };
}

export function getConfig(): StellarConfig {
  return { ...currentConfig };
}

export function resetConfig(): void {
  currentConfig = { ...defaultConfig };
}
