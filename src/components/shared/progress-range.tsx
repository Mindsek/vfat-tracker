import { cn } from "@/lib/utils";
import { VFatPosition } from "@/types/vfat.type";
import { formatNumber } from "@/utils/formatNumber";
import { getRange } from "@/utils/getRange";

interface ProgressRangeProps {
  position: VFatPosition;
  className?: string;
}

export const ProgressRange = ({ position, className }: ProgressRangeProps) => {
  const { isInRange, currentPrice, minPrice, maxPrice } = getRange(position);
  const tickLow = position.nft.tickLow;
  const tickUp = position.nft.tickUp;
  const tickSpacing = position.tickSpacing;
  const rangeSize = tickUp - tickLow;
  const ticksPerStep = tickSpacing;
  const steps = rangeSize / ticksPerStep;
  const percentage = Math.round((steps / 100) * 100);

  const token0Symbol = position.underlying[0].symbol;
  const token1Symbol = position.underlying[1].symbol;

  // Calcul de la position actuelle dans la range
  const currentPercentage = Math.min(
    Math.max(
      ((Math.log(currentPrice) / Math.log(1.0001) - tickLow) /
        (tickUp - tickLow)) *
        100,
      0
    ),
    100
  );

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Current Position</span>
        <span>Width: {percentage}%</span>
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-xs",
            isInRange
              ? "bg-green-500/20 text-green-500"
              : "bg-red-500/20 text-red-500"
          )}
        >
          {isInRange ? "In Range" : "Out of Range"}
        </span>
      </div>
      <div className="relative">
        <div className="h-2 bg-secondary rounded-full overflow-hidden"></div>
        <div
          className="absolute top-1/2 w-2 h-6 bg-foreground -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${currentPercentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span>Min: {formatNumber(minPrice, { decimals: 2 })}</span>
        <div className="flex items-center gap-2">
          <span>Current Price:</span>
          <span>
            {formatNumber(currentPrice, { decimals: 2 })} {token0Symbol}/
            {token1Symbol}
          </span>
        </div>
        <span>Max: {formatNumber(maxPrice, { decimals: 2 })}</span>
      </div>
    </div>
  );
};
