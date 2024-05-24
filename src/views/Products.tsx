import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/ProductService";
import { Product } from "../types";
import ProductDetails from "../components/ProductDetails";
import Modal from "../components/Modal";
import { useModalContext } from "../hooks/useModal";

export async function loader() {
  const products = await getProducts();

  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateAvailability(+data.id);

  return {};
}

function Products() {
  const products = useLoaderData() as Product[];
  const { showModal } = useModalContext();

  return (
    <>
      <div className="max-w-4xl p-2 mx-auto">
        <h1 className="my-10 text-2xl font-bold text-center text-gray-800 dark:text-white">
          Lista de Productos
        </h1>

        {products.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
              <caption className="sr-only">Productos</caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Disponibilidad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <ProductDetails key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No hay productos agregados aún.
          </p>
        )}
      </div>
      {showModal &&
        products.map((product) => <Modal key={product.id} product={product} />)}
    </>
  );
}

export default Products;
