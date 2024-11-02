"use server";

import { Address } from "@/schema/address.schema";
import { VFatPosition } from "@/types/vfat.type";

// Simulation de données pour test
const mockData: VFatPosition[] = [
  {
    wallet: "0x171c59ef266ba6aa08ede1e9adb681dcc74ad7ba",
    chainId: 8453,
    address: "0xa4463789e8f3c6a599b3dfb608dde55513bcf289",
    symbol: "UNI-V3",
    decimals: 0,
    id: "2009671",
    nft: {
      id: "2009671",
      tickLow: 66200,
      tickUp: 66600,
      liquidity: "6232738936645773764835",
      managerAddress: "0x827922686190790b37229fd06084350e74485b72",
      ownerAddress: "0xa103916975b138c72c68d4330d63500475f02cd7",
      poolAddress: "0xa4463789e8f3c6a599b3dfb608dde55513bcf289",
    },
    tickSpacing: 100,
    price: 11041.38,
    underlying: [
      {
        chainId: 8453,
        address: "0x4200000000000000000000000000000000000006",
        symbol: "WETH",
        decimals: 18,
        balance: "0.568990561285682181",
        reserve: "25130649761316360363",
        virtualReserve: "3973451474504597718257",
        weight: 1,
        price: 2488.55,
      },
      {
        chainId: 8453,
        address: "0x6985884c4392d348587b19cb9eaaf157f13271cd",
        symbol: "ZRO",
        decimals: 18,
        balance: "3004.458731740461772589",
        reserve: "156473076475581838269792",
        virtualReserve: "3085455328686790970951359",
        weight: 1,
        price: 3.2,
      },
    ],
    gaugeAddress: "0x46e078fedcd91a813306d5637d7ec5c7dc201ec3",
    rewardTokenAddress: "0x940181a94a35a4569e4529a3cdfb74e38fd98631",
    balance: "1",
    rewards: "20458516406148839569",
    sickleAddress: "0xa103916975b138c72c68d4330d63500475f02cd7",
    autoRebalanceConfig: {
      autoRebalance: false,
      rewardBehavior: 0,
      harvestTokenOut: "0x0000000000000000000000000000000000000000",
      diffToRebalanceBelowTick: 0,
      diffToRebalanceAboveTick: 0,
      slippage: 0,
      stopLossTickLow: 0,
      stopLossTickHigh: 0,
      delayMin: 0,
    },
  },
  {
    wallet: "0x171c59ef266ba6aa08ede1e9adb681dcc74ad7ba",
    chainId: 8453,
    address: "0xa4463789e8f3c6a599b3dfb608dde55513bcf289",
    symbol: "UNI-V3",
    decimals: 0,
    id: "2009671",
    nft: {
      id: "2009671",
      tickLow: 66200,
      tickUp: 66600,
      liquidity: "6232738936645773764835",
      managerAddress: "0x827922686190790b37229fd06084350e74485b72",
      ownerAddress: "0xa103916975b138c72c68d4330d63500475f02cd7",
      poolAddress: "0xa4463789e8f3c6a599b3dfb608dde55513bcf289",
    },
    tickSpacing: 100,
    price: 11041.38,
    underlying: [
      {
        chainId: 8453,
        address: "0x4200000000000000000000000000000000000006",
        symbol: "WETH",
        decimals: 18,
        balance: "0.568990561285682181",
        reserve: "25130649761316360363",
        virtualReserve: "3973451474504597718257",
        weight: 1,
        price: 2488.55,
      },
      {
        chainId: 8453,
        address: "0x6985884c4392d348587b19cb9eaaf157f13271cd",
        symbol: "ZRO",
        decimals: 18,
        balance: "3004.458731740461772589",
        reserve: "156473076475581838269792",
        virtualReserve: "3085455328686790970951359",
        weight: 1,
        price: 3.2,
      },
    ],
    gaugeAddress: "0x46e078fedcd91a813306d5637d7ec5c7dc201ec3",
    rewardTokenAddress: "0x940181a94a35a4569e4529a3cdfb74e38fd98631",
    balance: "1",
    rewards: "20458516406148839569",
    sickleAddress: "0xa103916975b138c72c68d4330d63500475f02cd7",
    autoRebalanceConfig: {
      autoRebalance: false,
      rewardBehavior: 0,
      harvestTokenOut: "0x0000000000000000000000000000000000000000",
      diffToRebalanceBelowTick: 0,
      diffToRebalanceAboveTick: 0,
      slippage: 0,
      stopLossTickLow: 0,
      stopLossTickHigh: 0,
      delayMin: 0,
    },
  },
];

export async function fetchVFatPositions(
  addresses: Address[]
): Promise<VFatPosition[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(
      `https://api.vfat.io/v1/slipstream-gauge-balances?addresses=${addresses.join(
        ","
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
        next: {
          revalidate: 60,
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data as VFatPosition[];
  } catch (error) {
    console.error("Error fetching vfat positions:", error);
    return [];
  }
}

/**
 https://api.vfat.io/v1/slipstream-gauge-balances?addresses=0x171c59ef266ba6aa08ede1e9adb681dcc74ad7ba
 response:
 [
    {
        "wallet": "0x171c59ef266ba6aa08ede1e9adb681dcc74ad7ba",
        "chainId": 8453,
        "address": "0xa4463789e8f3c6a599b3dfb608dde55513bcf289",
        "symbol": "UNI-V3",
        "decimals": 0,
        "id": "2009671",
        "nft": {
            "id": "2009671",
            "tickLow": 66200,
            "tickUp": 66600,
            "liquidity": "6232738936645773764835",
            "managerAddress": "0x827922686190790b37229fd06084350e74485b72",
            "ownerAddress": "0xa103916975b138c72c68d4330d63500475f02cd7",
            "poolAddress": "0xa4463789e8f3c6a599b3dfb608dde55513bcf289"
        },
        "tickSpacing": 100,
        "price": 11041.382173882357,
        "underlying": [
            {
                "chainId": 8453,
                "address": "0x4200000000000000000000000000000000000006",
                "symbol": "WETH",
                "decimals": 18,
                "balance": "0.568990561285682181",
                "reserve": "25130649761316360363",
                "virtualReserve": "3973451474504597718257",
                "weight": 1,
                "price": 2488.55225
            },
            {
                "chainId": 8453,
                "address": "0x6985884c4392d348587b19cb9eaaf157f13271cd",
                "symbol": "ZRO",
                "decimals": 18,
                "balance": "3004.458731740461772589",
                "reserve": "156473076475581838269792",
                "virtualReserve": "3085455328686790970951359",
                "weight": 1,
                "price": 3.203711647185839
            }
        ],
        "gaugeAddress": "0x46e078fedcd91a813306d5637d7ec5c7dc201ec3",
        "rewardTokenAddress": "0x940181a94a35a4569e4529a3cdfb74e38fd98631",
        "balance": "1",
        "rewards": "20458516406148839569",
        "sickleAddress": "0xa103916975b138c72c68d4330d63500475f02cd7",
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
        }
    }
]
 *  */
