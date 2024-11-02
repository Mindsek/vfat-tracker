import { VFatPosition } from "@/types/vfat.type";

// Fonction pour calculer la valeur totale d'une position
export function calculatePositionValue(position: VFatPosition): number {
  return position.underlying.reduce((total, token) => {
    const tokenValue = parseFloat(token.balance) * token.price;
    return total + tokenValue;
  }, 0);
}
