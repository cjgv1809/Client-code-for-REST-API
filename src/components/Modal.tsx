import { useNavigate } from "react-router-dom";
import { useModalContext } from "../hooks/useModal";
import { deleteProduct } from "../services/ProductService";
import { Product } from "../types";

function Modal({ product }: { product: Product }) {
  const { showModal, setShowModal, message } = useModalContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setShowModal(false);
    await deleteProduct(product.id);
    navigate("/"); // Redirect to the home page after deletion
  };

  if (!showModal) return null;

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen p-4 overflow-x-hidden overflow-y-auto"
    >
      <div className="relative w-full max-w-md max-h-full p-4">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setShowModal(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 text-center md:p-5">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              onClick={handleDelete}
            >
              Eliminar Producto
            </button>
            <button
              type="button"
              className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
