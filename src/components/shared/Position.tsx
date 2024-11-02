import { VFatPosition } from "@/types/vfat.type";
import { calculatePositionValue } from "@/utils/calculatePositionValue";
import { getChainName, getExplorerUrl } from "@/utils/chains";
import { formatNumber } from "@/utils/formatNumber";
import { ExternalLinkIcon } from "lucide-react";
import { ProgressRange } from "./progress-range";

interface PositionProps {
  position: VFatPosition;
}

const Position = ({ position }: PositionProps) => {
  return (
    <div key={position.id} className="space-y-4">
      <HeaderPosition position={position} />
      <ProgressRange position={position} />
      <Tokens position={position} />
    </div>
  );
};

export default Position;

const HeaderPosition = ({ position }: { position: VFatPosition }) => {
  const chainName = getChainName(position.chainId);
  const explorerUrl = getExplorerUrl(position.chainId);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Position Value:</span>
        <span className="text-xs text-muted-foreground">
          {explorerUrl ? (
            <a
              href={`${explorerUrl}/address/${position.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary"
            >
              {chainName}
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
          ) : (
            chainName
          )}
        </span>
      </div>
      <span className="text-sm font-medium">
        {formatNumber(calculatePositionValue(position), { currency: true })}
      </span>
    </div>
  );
};

const Tokens = ({ position }: { position: VFatPosition }) => {
  return (
    <div className="space-y-1">
      {position.underlying.map((token) => (
        <div key={token.address} className="flex text-xs">
          <span className="text-muted-foreground">{token.symbol}:</span>
          <div className="flex gap-2">
            <span>
              {formatNumber(token.balance, { decimals: token.decimals })}
            </span>
            <span className="text-muted-foreground">
              (
              {formatNumber(parseFloat(token.balance) * token.price, {
                currency: true,
              })}
              )
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
