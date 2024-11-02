"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FormSchema, addressSchema } from "@/schema/address.schema";
import { useAddressesStore } from "@/store/addresses.store";
export function FormAddresses() {
  const { toast } = useToast();
  const { addresses, setAddresses, addAddress } = useAddressesStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const parsedAddress = addressSchema.parse(data.address.toLowerCase());
    if (addresses.includes(parsedAddress)) {
      toast({
        title: "Address already exists",
        description: "This address is already being tracked",
        variant: "destructive",
      });
      return;
    }

    addAddress(parsedAddress);

    toast({
      title: "New address added:",
      description: <span className="text-xs break-all">{parsedAddress}</span>,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-2 max-w-2xl"
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Track an address"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
