import { Networks, Horizon } from "@stellar/stellar-sdk";

export type StellarNetwork = "testnet" | "mainnet";

export interface NetworkConfig {
  networkPassphrase: string;
  horizonUrl: string;
  friendbotUrl?: string;
}

const NETWORK_CONFIGS: Record<StellarNetwork, NetworkConfig> = {
  testnet: {
    networkPassphrase: Networks.TESTNET,
    horizonUrl: "https://horizon-testnet.stellar.org",
    friendbotUrl: "https://friendbot.stellar.org",
  },
  mainnet: {
    networkPassphrase: Networks.PUBLIC,
    horizonUrl: "https://horizon.stellar.org",
  },
};

/**
 * Returns the network configuration for the given network.
 */
export function getNetworkConfig(network: StellarNetwork): NetworkConfig {
  return NETWORK_CONFIGS[network];
}

/**
 * Returns a Horizon server instance for the given network.
 */
export function getServer(network: StellarNetwork): Horizon.Server {
  const { horizonUrl } = getNetworkConfig(network);
  return new Horizon.Server(horizonUrl);
}
