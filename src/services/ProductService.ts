import { safeParse } from "valibot";
import {
  DraftProductSchema,
  Product,
  ProductListSchema,
  ProductSchema,
} from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price, // Convert to number
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      // Send data to the server using axios
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductListSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error al obtener los productos");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error al obtener el producto");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateProduct(id: Product["id"], data: ProductData) {
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: +data.price,
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      // Send data to the server using axios
      await axios.put(url, result.output);
    } else {
      throw new Error("Datos no validos para actualizar el producto");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    // Send data to the server using axios
    await axios.delete(url);
  } catch (error) {
    console.error(error);
  }
}

export async function updateAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    // Send data to the server using axios
    await axios.patch(url);
  } catch (error) {
    console.error(error);
  }
}
