import React, { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout/Layout.jsx";
import Home from "./component/Home/Home.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Categoris from "./component/Categoris/Categoris.jsx";
import Brands from "./component/Brands/Brands.jsx";
import Register from "./component/Register/Register.jsx";
import Login from "./component/Login/Login.jsx";
import NotFound from "./component/NotFound/NotFound.jsx";
import Products from "./component/Products/Products.jsx";

import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./component/ProductDetails/ProductDetails.jsx";
import { Toaster } from "react-hot-toast";
import Wishlist from "./component/Wishlist/Wishlist.jsx";
import ShipingAdress from "./component/ShipingAdderss/ShipingAdress.jsx";
import { ReactQueryDevtools } from "react-query/devtools";
import CartContextProvider from "./Context/CartContext.js";
import WishlistContextProvider from "./Context/WishlistContext.js";
import UserContextProvider from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
let queryClint = new QueryClient();

export default function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "shipingadress/:cartId",
          element: (
            <ProtectedRoute>
              <ShipingAdress />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },

        {
          path: "categoris",
          element: (
            <ProtectedRoute>
              <Categoris />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  if (localStorage.getItem("usertokern")) {
  }
  return (
    <>
      <UserContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <QueryClientProvider client={queryClint}>
              <RouterProvider router={routers} />

              <Toaster />
              <ReactQueryDevtools />
            </QueryClientProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </UserContextProvider>
    </>
  );
}
