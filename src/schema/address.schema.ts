import { z } from "zod";

export const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
  message: "Address must be a valid Ethereum address",
});
export type Address = z.infer<typeof addressSchema>;
export const FormSchema = z.object({
  address: addressSchema,
});
