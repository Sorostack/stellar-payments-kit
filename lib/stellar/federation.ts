export interface FederationAddress {
  accountId: string;
  memo?: string;
  memoType?: string;
}

export async function resolveFederationAddress(
  address: string,
  domain?: string,
): Promise<FederationAddress> {
  const parts = address.split("*");
  if (parts.length !== 2) {
    throw new Error(`Invalid federation address: ${address}`);
  }

  const [username, addrDomain] = parts;
  const stellarTomlUrl = `https://${domain || addrDomain}/.well-known/stellar.toml`;

  const tomlResponse = await fetch(stellarTomlUrl);
  if (!tomlResponse.ok) {
    throw new Error(`Failed to fetch stellar.toml from ${stellarTomlUrl}`);
  }

  const tomlText = await tomlResponse.text();
  const federationServerMatch = tomlText.match(/FEDERATION_SERVER\s*=\s*["']?([^\s"']+)["']?/);

  if (!federationServerMatch) {
    throw new Error("No FEDERATION_SERVER found in stellar.toml");
  }

  const federationServer = federationServerMatch[1];
  const federationUrl = `${federationServer}?q=${encodeURIComponent(address)}&type=name`;

  const fedResponse = await fetch(federationUrl);
  if (!fedResponse.ok) {
    throw new Error(`Federation request failed: ${fedResponse.statusText}`);
  }

  const fedData = await fedResponse.json();
  return {
    accountId: fedData.account_id,
    memo: fedData.memo,
    memoType: fedData.memo_type,
  };
}
