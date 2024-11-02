import { Address } from "@/schema/address.schema";
import { create } from "zustand";

const STORAGE_KEY = "tracked-addresses";

const isClient = typeof window !== "undefined";

const getInitialAddresses = (): Address[] => {
  if (!isClient) return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

interface AddressesState {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  addAddress: (address: Address) => void;
  removeAddress: (address: Address) => void;
}

export const useAddressesStore = create<AddressesState>((set) => ({
  addresses: [],
  setAddresses: (addresses: Address[]) => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    }
    set({ addresses });
  },
  addAddress: (address: Address) =>
    set((state) => {
      const newAddresses = [...state.addresses, address];
      if (isClient) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAddresses));
      }
      return { addresses: newAddresses };
    }),
  removeAddress: (address: Address) =>
    set((state) => {
      const newAddresses = state.addresses.filter((a) => a !== address);
      if (isClient) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAddresses));
      }
      return { addresses: newAddresses };
    }),
}));

if (isClient) {
  useAddressesStore.setState({ addresses: getInitialAddresses() });
}
