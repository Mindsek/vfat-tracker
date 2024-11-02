export interface Chain {
  id: number;
  name: string;
  icon?: string;
  explorer?: string;
}

export const CHAINS: Record<number, Chain> = {
  1: {
    id: 1,
    name: "Ethereum",
    explorer: "https://etherscan.io",
  },
  10: {
    id: 10,
    name: "Optimism",
    explorer: "https://optimistic.etherscan.io",
  },
  56: {
    id: 56,
    name: "BNB Chain",
    explorer: "https://bscscan.com",
  },
  137: {
    id: 137,
    name: "Polygon",
    explorer: "https://polygonscan.com",
  },
  8453: {
    id: 8453,
    name: "Base",
    explorer: "https://basescan.org",
  },
  42161: {
    id: 42161,
    name: "Arbitrum One",
    explorer: "https://arbiscan.io",
  },
};

export function getChainName(chainId: number): string {
  return CHAINS[chainId]?.name || `Chain ${chainId}`;
}

export function getExplorerUrl(chainId: number): string | undefined {
  return CHAINS[chainId]?.explorer;
}
