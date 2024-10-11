import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/styling/main.min.css";
import ProductList from "./sections/ProductList";
import Cart from "./sections/Cart";
import ThankYou from "./sections/ThankYou";
import NotFound from "./sections/NotFound";

const App = () => {
  const routes = [
    {
      path: "/",
      element: <ProductList />,
      errorElement: <NotFound />,
    },
    {
      path: "/cart",
      element: <Cart />,
      errorElement: <NotFound />,
    },
    {
      path: "/thank-you",
      element: <ThankYou />,
      errorElement: <NotFound />,
    }
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
