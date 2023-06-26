import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CheckoutSideMenu from "../Components/CheckoutSideMenu";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <CheckoutSideMenu />
      <Outlet />
    </>
  );
};
