import { Address } from "@/schema/address.schema";

interface UnderlyingToken {
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
  balance: string;
  reserve: string;
  virtualReserve: string;
  weight: number;
  price: number;
}

interface NFTData {
  id: string;
  tickLow: number;
  tickUp: number;
  liquidity: string;
  managerAddress: string;
  ownerAddress: string;
  poolAddress: string;
}

interface AutoRebalanceConfig {
  autoRebalance: boolean;
  rewardBehavior: number;
  harvestTokenOut: string;
  diffToRebalanceBelowTick: number;
  diffToRebalanceAboveTick: number;
  slippage: number;
  stopLossTickLow: number;
  stopLossTickHigh: number;
  delayMin: number;
}

export interface VFatPosition {
  wallet: Address;
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
  id: string;
  nft: NFTData;
  tickSpacing: number;
  price: number;
  underlying: UnderlyingToken[];
  gaugeAddress: string;
  rewardTokenAddress: string;
  balance: string;
  rewards: string;
  sickleAddress: string;
  autoRebalanceConfig: AutoRebalanceConfig;
}
