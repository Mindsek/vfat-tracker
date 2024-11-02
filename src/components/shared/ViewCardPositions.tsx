"use client";

import { fetchVFatPositions } from "@/components/actions/vfat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Address } from "@/schema/address.schema";
import { useAddressesStore } from "@/store/addresses.store";
import type { VFatPosition } from "@/types/vfat.type";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Position from "./Position";

export function ViewCardPositions() {
  const { addresses, removeAddress } = useAddressesStore();
  const { toast } = useToast();
  const [positions, setPositions] = useState<Record<Address, VFatPosition[]>>(
    {}
  );
  const [isLocalStorageLoading, setIsLocalStorageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPositions() {
      if (addresses.length === 0) {
        setPositions({});
        setIsLoading(false);
        setIsLocalStorageLoading(true);
        return;
      }

      try {
        setIsLocalStorageLoading(true);
        setIsLoading(true);

        const data = await fetchVFatPositions(addresses);

        if (data.length === 0) {
          toast({
            title: "API temporarily unavailable",
            description: "Please try again later",
            variant: "destructive",
          });
          return;
        }

        const positionsByAddress = data.reduce((acc, position) => {
          if (!acc[position.wallet]) {
            acc[position.wallet] = [];
          }
          acc[position.wallet].push(position);
          return acc;
        }, {} as Record<Address, VFatPosition[]>);

        setPositions(positionsByAddress);
      } catch (error) {
        toast({
          title: "Error fetching positions",
          description: "Failed to load positions data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadPositions();
  }, [addresses, toast]);

  const copyToClipboard = (address: Address) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied to clipboard",
      description: <span className="text-xs break-all">{address}</span>,
    });
  };

  if (addresses.length === 0 && isLocalStorageLoading) {
    return (
      <div className="text-center text-muted-foreground">
        No addresses added yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {addresses.map((address) => (
        <Card key={address} className="w-full">
          <CardHeader>
            <CardTitle className="text-sm break-all flex items-center justify-between gap-2">
              <button onClick={() => copyToClipboard(address)}>
                {address}
              </button>
              <button onClick={() => removeAddress(address)}>
                <XIcon className="w-4 h-4 text-red-500" />
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : positions[address]?.length > 0 ? (
              <div className="space-y-4">
                {positions[address].map((position, index) => (
                  <div key={`${position.id}-${index}`} className="space-y-4">
                    <Position position={position} />
                    {index < positions[address].length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No positions found
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
