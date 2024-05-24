import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({
  request,
}: ActionFunctionArgs<{
  name: string;
  price: string;
}>) {
  const data = Object.fromEntries(await request.formData());
  let error = "";

  if (!data.name || !data.price) {
    error = "Todos los campos son obligatorios";
  }

  if (error?.length) {
    return error;
  }

  await addProduct(data);

  return redirect("/"); // Redirect to the home page
}

function NewProduct() {
  const error = useActionData() as string; // Explicitly type error as string

  return (
    <>
      <h1 className="my-10 text-2xl font-bold text-center text-gray-800 dark:text-white">
        Registrar Nuevo Producto
      </h1>
      <Form
        method="POST"
        className="max-w-xl p-8 mx-5 mt-10 bg-white rounded-md shadow-md sm:mx-auto dark:bg-primary"
      >
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ProductForm />

        <input
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}

export default NewProduct;
