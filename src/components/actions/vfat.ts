"use server";

import { Address } from "@/schema/address.schema";
import { VFatPosition } from "@/types/vfat.type";

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
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as VFatPosition[];
  } catch (error) {
    console.error("Error fetching vfat positions:", error);
    return [];
  }
}
