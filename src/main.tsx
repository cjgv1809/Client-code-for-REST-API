import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import BrowserRouter from "./router";
import { ModalProvider } from "./context/ModalContext";
import "flowbite/dist/flowbite.min.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={BrowserRouter} />
    </ModalProvider>
  </React.StrictMode>
);
