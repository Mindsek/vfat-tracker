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

interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  totalSupply: string;
  price: number;
  distanceToOracle: number;
  liquidity: number;
  reserves: string;
}

interface PendingReward {
  amount: string;
  token: Token;
}

interface RebalanceConfig {
  tickSpacesBelow: number;
  tickSpacesAbove: number;
  bufferTicksBelow: number;
  bufferTicksAbove: number;
  dustBP: string;
  priceImpactBP: string;
  slippageBP: string;
  cutoffTickLow: number;
  cutoffTickHigh: number;
  delayMin: number;
}

interface RewardConfig {
  rewardBehavior: number;
  harvestTokenOut: string;
}

interface ExitConfig {
  triggerTickLow: number;
}

interface NFTSettings {
  pool: string;
  autoRebalance: boolean;
  rebalanceConfig: RebalanceConfig;
  automateRewards: boolean;
  rewardConfig: RewardConfig;
  autoExit: boolean;
  exitConfig: ExitConfig;
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
  pendingRewards: PendingReward[];
  sickleAddress: string;
  autoRebalanceConfig: AutoRebalanceConfig;
  nftSettings: NFTSettings;
}

/**
 * [
    {
        "wallet": "0x48845d08edc234a3bc0a8055a70433fae660e823",
        "chainId": 8453,
        "address": "0xa4463789e8f3c6a599b3dfb608dde55513bcf289",
        "symbol": "UNI-V3",
        "decimals": 0,
        "id": "3667745",
        "nft": {
            "id": "3667745",
            "tickLow": 63900,
            "tickUp": 64300,
            "liquidity": "3117620463328129717178",
            "managerAddress": "0x827922686190790b37229fd06084350e74485b72",
            "ownerAddress": "0xfc43ab38e11a965797337a36803f250f5586761d",
            "poolAddress": "0xa4463789e8f3c6a599b3dfb608dde55513bcf289"
        },
        "tickSpacing": 100,
        "price": 10009.542254839482,
        "underlying": [
            {
                "chainId": 8453,
                "address": "0x4200000000000000000000000000000000000006",
                "symbol": "WETH",
                "decimals": 18,
                "balance": "0.989015795364386713",
                "reserve": "91103089261224287282",
                "virtualReserve": "2597454220571119961353",
                "weight": 1,
                "price": 3986.79
            },
            {
                "chainId": 8453,
                "address": "0x6985884c4392d348587b19cb9eaaf157f13271cd",
                "symbol": "ZRO",
                "decimals": 18,
                "balance": "928.672965441244452177",
                "reserve": "85368018953404584494104",
                "virtualReserve": "1584976072779286744377199",
                "weight": 1,
                "price": 6.532486890211427
            }
        ],
        "gaugeAddress": "0x46e078fedcd91a813306d5637d7ec5c7dc201ec3",
        "rewardTokenAddress": "0x940181a94a35a4569e4529a3cdfb74e38fd98631",
        "balance": "1",
        "rewards": "0",
        "pendingRewards": [
            {
                "amount": "45933487052820304157",
                "token": {
                    "address": "0x940181a94a35a4569e4529a3cdfb74e38fd98631",
                    "name": "Aerodrome",
                    "symbol": "AERO",
                    "decimals": 18,
                    "chainId": 8453,
                    "totalSupply": "1343461595166985138953471818",
                    "price": 2.1561194978282296,
                    "distanceToOracle": 1,
                    "liquidity": 91502108.034403,
                    "reserves": "43307104578473889194494939"
                }
            }
        ],
        "sickleAddress": "0xfc43ab38e11a965797337a36803f250f5586761d",
        "autoRebalanceConfig": {
            "autoRebalance": false,
            "rewardBehavior": 0,
            "harvestTokenOut": "0x0000000000000000000000000000000000000000",
            "diffToRebalanceBelowTick": 0,
            "diffToRebalanceAboveTick": 0,
            "slippage": 0,
            "stopLossTickLow": 0,
            "stopLossTickHigh": 0,
            "delayMin": 0
        },
        "nftSettings": {
            "pool": "0xa4463789e8f3c6a599b3dfb608dde55513bcf289",
            "autoRebalance": true,
            "rebalanceConfig": {
                "tickSpacesBelow": 2,
                "tickSpacesAbove": 1,
                "bufferTicksBelow": 0,
                "bufferTicksAbove": 0,
                "dustBP": "100",
                "priceImpactBP": "50",
                "slippageBP": "50",
                "cutoffTickLow": -887272,
                "cutoffTickHigh": 887272,
                "delayMin": 0,
                "rewardConfig": {
                    "rewardBehavior": 2,
                    "harvestTokenOut": "0x0000000000000000000000000000000000000000"
                }
            },
            "automateRewards": true,
            "rewardConfig": {
                "rewardBehavior": 2,
                "harvestTokenOut": "0x0000000000000000000000000000000000000000"
            },
            "autoExit": false,
            "exitConfig": {
                "triggerTickLow": 0,
                "triggerTickHigh": 0,
                "exitTokenOutLow": "0x0000000000000000000000000000000000000000",
                "exitTokenOutHigh": "0x0000000000000000000000000000000000000000",
                "priceImpactBP": "0",
                "slippageBP": "0"
            }
        }
    }
]
 */
