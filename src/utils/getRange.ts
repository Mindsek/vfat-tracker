import { VFatPosition } from "@/types/vfat.type";

const BASE = 1.0001;

export const tickToPrice = (tick: number): number => {
  return Math.pow(BASE, tick);
};

export const getRange = (
  position: VFatPosition
): {
  isInRange: boolean;
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
} => {
  // Prix min et max de la range
  const minPrice = tickToPrice(position.nft.tickLow);
  const maxPrice = tickToPrice(position.nft.tickUp);

  // Prix actuel (WETH/ZRO)
  const token0Price = position.underlying[0].price;
  const token1Price = position.underlying[1].price;
  const currentPrice = token0Price / token1Price;

  return {
    isInRange: currentPrice >= minPrice && currentPrice <= maxPrice,
    currentPrice,
    minPrice,
    maxPrice,
  };
};
