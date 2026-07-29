import { Keypair } from "@stellar/stellar-sdk";

export class ChannelAccountManager {
  private channels: Keypair[] = [];
  private currentIndex = 0;

  constructor(channelSecrets: string[]) {
    this.channels = channelSecrets.map((s) => Keypair.fromSecret(s));
  }

  nextChannel(): Keypair {
    const channel = this.channels[this.currentIndex % this.channels.length];
    this.currentIndex++;
    return channel;
  }

  getChannel(index: number): Keypair {
    return this.channels[index % this.channels.length];
  }

  get channelsCount(): number {
    return this.channels.length;
  }
}
