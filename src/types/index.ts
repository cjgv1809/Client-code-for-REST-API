import { boolean, number, object, string, InferOutput, array } from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
});

export const ProductListSchema = array(ProductSchema);

// Convert the schema to a type using the `InferOutput` utility
export type Product = InferOutput<typeof ProductSchema>;
