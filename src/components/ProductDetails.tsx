import { useFetcher, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { useModalContext } from "../hooks/useModal";

type ProductDetailsProps = {
  product: Product;
};

function ProductDetails({ product }: ProductDetailsProps) {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { setShowModal } = useModalContext();

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <tr className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {product.name}
        </th>
        <td className="px-6 py-4">{formatCurrency(product.price)}</td>
        <td className="px-6 py-4">
          <fetcher.Form method="POST">
            {product.availability ? (
              <button
                type="submit"
                className="focus:outline-none"
                name="id"
                value={product.id}
              >
                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                  Disponible
                </span>
              </button>
            ) : (
              <button
                type="submit"
                className="focus:outline-none"
                name="id"
                value={product.id}
              >
                <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                  <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                  Agotado
                </span>
              </button>
            )}
          </fetcher.Form>
        </td>
        <td className="flex items-center gap-3 px-6 py-4">
          <button
            className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="button"
            title="Editar Producto"
            onClick={() => navigate(`/products/${product.id}/edit`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
            </svg>
            <span>Editar</span>
          </button>

          <button
            className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            type="button"
            title="Eliminar Producto"
            onClick={handleDeleteClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325c.827-.05 1.66-.075 2.5-.075ZM5.272 5.116a41.032 41.032 0 0 0 9.456 0l-.8 10.004a1.25 1.25 0 0 1-1.246 1.15H7.596a1.25 1.25 0 0 1-1.245-1.15l-.8-10.004ZM8.5 8.25a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-5a.75.75 0 0 1 .75-.75Zm4.25.75a.75.75 0 1 0-1.5 0v5a.75.75 0 1 0 1.5 0v-5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>Eliminar</span>
          </button>
        </td>
      </tr>
    </>
  );
}

export default ProductDetails;
