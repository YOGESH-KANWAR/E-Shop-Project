import React, { useCallback, useEffect, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import "./App.css";
import App from "./App.jsx";
import Layout from "./componets/layout.jsx";
import Category from "./componets/category.jsx";
import Product from "./componets/product.jsx";
import Singup from "./componets/singup.jsx";
import CustemPage from "./componets/custemPage.jsx";
import CategoryProduct from "./componets/categoryProduct.jsx";
import ProductDetails from "./componets/productDetails.jsx";
import ProductCard from "./componets/productCard.jsx";
import CartDetails from "./componets/cartDetails.jsx";
import OrderDetails from "./componets/orderDetails.jsx";
import Login from "./componets/Login.jsx";
import Profile from "./componets/profile.jsx";
import ProductOrder from "./componets/productOrder.jsx";
import OrderConform from "./componets/orderConform.jsx";
import Dashbord from "./componets/dashbord.jsx";
//import Dashbord from "./componets/dashbord.jsx";
import AdminLayout from "./componets/adminLayout.jsx";
//import AdminLogin from "./componets/loginAdmin.jsx";
import LoginAdmin from "./componets/loginAdmin.jsx";
import SignupAdmin from "./componets/signupAdmin.jsx"

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "categoryProduct",
        element: <CategoryProduct />,
      },
      {
        path: "Product",
        element: <Product />,
      },
      {
        path: "productDetails",
        element: <ProductDetails />,
      },
      {
        path: "productCard",
        element: <ProductCard />,
      },

      {
        path: "cartDetails",
        element: <CartDetails />,
      },
      {
        path: "productOrder",
        element: <ProductOrder />,
      },
      {
        path: "orderConform",
        element: <OrderConform />,
      },
      {
        path: "orderDetails",
        element: <OrderDetails />,
      },
      {
        path: "singup",
        element: <Singup />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "custemPage",
        element: <CustemPage />,
      },


    ],
  },
  {
    path: "dashbord",
    element: < Dashbord />,
    children: [

    ],
  },
  {
    path: "loginAdmin",
    element: < LoginAdmin />
  },
  {
    path: "signupAdmin",
    element: < SignupAdmin />
  },


]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>
);
