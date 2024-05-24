import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params?.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      return redirect("/"); // Redirect to the home page
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";

  if (!data.name || !data.price) {
    error = "Todos los campos son obligatorios";
  }

  if (error?.length) {
    return error;
  }

  if (params?.id !== undefined) {
    await updateProduct(+params.id, data);

    return redirect("/"); // Redirect to the home page
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

function EditProduct() {
  const error = useActionData() as string; // Explicitly type error as string
  const product = useLoaderData() as Product;

  return (
    <>
      <h1 className="my-10 text-2xl font-bold text-center text-gray-800 dark:text-white">
        Actualizar Producto
      </h1>

      <Form
        method="POST"
        className="max-w-xl p-8 mx-5 mt-10 bg-white rounded-md shadow-md dark:bg-primary sm:mx-auto"
      >
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ProductForm product={product} />

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="availability"
          >
            Disponibilidad
          </label>
          <select
            id="availability"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          value="Actualizar Producto"
        />
      </Form>
    </>
  );
}

export default EditProduct;
