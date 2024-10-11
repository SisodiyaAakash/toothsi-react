import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/styling/main.min.css";
import ProductList from "./sections/ProductList";
import Cart from "./sections/Cart";

const App = () => {
  const routes = [
    {
      path: "/",
      element: (
        <ProductList />
      ),
    },
    {
      path: "/cart",
      element: (
        <Cart />
      ),
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
