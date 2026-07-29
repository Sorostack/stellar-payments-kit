import { getServer, StellarNetwork } from "./network";

export type EventCallback = (data: any) => void;

export function subscribeToPayments(
  publicKey: string,
  onPayment: EventCallback,
  network: StellarNetwork = "testnet",
): () => void {
  const server = getServer(network);
  let stream: any;

  const subscribe = async () => {
    stream = server
      .payments()
      .forAccount(publicKey)
      .cursor("now")
      .stream({
        onmessage: (data: any) => onPayment(data),
      });
  };

  subscribe();

  return () => {
    if (stream && typeof stream === "function") {
      stream();
    }
  };
}

export function subscribeToTransactions(
  publicKey: string,
  onTransaction: EventCallback,
  network: StellarNetwork = "testnet",
): () => void {
  const server = getServer(network);
  let stream: any;

  const subscribe = async () => {
    stream = server
      .transactions()
      .forAccount(publicKey)
      .cursor("now")
      .stream({
        onmessage: (data: any) => onTransaction(data),
      });
  };

  subscribe();

  return () => {
    if (stream && typeof stream === "function") {
      stream();
    }
  };
}

export function subscribeToOperations(
  publicKey: string,
  onOperation: EventCallback,
  network: StellarNetwork = "testnet",
): () => void {
  const server = getServer(network);
  let stream: any;

  const subscribe = async () => {
    stream = server
      .operations()
      .forAccount(publicKey)
      .cursor("now")
      .stream({
        onmessage: (data: any) => onOperation(data),
      });
  };

  subscribe();

  return () => {
    if (stream && typeof stream === "function") {
      stream();
    }
  };
}
