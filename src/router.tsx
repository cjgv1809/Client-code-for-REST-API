import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as productsLoader,
  action as updateAvailabilityAction,
} from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "./views/EditProduct";
// import { action as deleteProductAction } from "./components/ProductDetails";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // These are the children of the Layout component in the Outlet component
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader, // This is the loader function that will be executed when the route is accessed by the user
        action: updateAvailabilityAction, // This is the action function that will be executed when the route is accessed by the user
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction, // This is the action function that will be executed when the route is accessed by the user
      },
      {
        path: "products/:id/edit",
        element: <EditProduct />,
        loader: editProductLoader, // This is the loader function that will be executed when the route is accessed by the user
        action: editProductAction, // This is the action function that will be executed when the route is accessed by the user
      },
      {
        path: "products/:id/delete",
        // action: deleteProductAction, // This is the action function that will be executed when the route is accessed by the user
      },
    ],
  },
]);

export default BrowserRouter;
