import { getServer, StellarNetwork } from "./network";

export interface TransactionStatus {
  hash: string;
  confirmed: boolean;
  ledger?: number;
  successful?: boolean;
  resultCodes?: Record<string, string>;
}

export async function pollTransactionStatus(
  hash: string,
  network: StellarNetwork = "testnet",
  maxRetries = 10,
  intervalMs = 1000,
): Promise<TransactionStatus> {
  const server = getServer(network);

  for (let i = 0; i < maxRetries; i++) {
    try {
      const tx = await server.transactions().transaction(hash).call();
      const ledgerNum = Number(tx.ledger);
      return {
        hash,
        confirmed: true,
        ledger: ledgerNum,
        successful: tx.successful,
      };
    } catch {
      if (i === maxRetries - 1) {
        return { hash, confirmed: false };
      }
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }

  return { hash, confirmed: false };
}
