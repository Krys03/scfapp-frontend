import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function Shell() {
  return (
    <>
      <Topbar />
      {/* ❌ pas de pt ici non plus */}
      <Outlet />
      <Footer />
    </>
  );
}
