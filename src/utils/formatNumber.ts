export function formatNumber(
  value: string | number,
  options: {
    decimals?: number;
    compact?: boolean;
    currency?: boolean;
  } = {}
): string {
  const { decimals = 2, compact = false, currency = false } = options;

  const num = typeof value === "string" ? parseFloat(value) : value;

  if (compact && Math.abs(num) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  }

  if (currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  if (Math.abs(num) < 0.01 && num !== 0) {
    return num.toExponential(2);
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: Math.min(decimals, 4),
    maximumFractionDigits: Math.min(decimals, 4),
  }).format(num);
}
