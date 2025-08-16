import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function PublicShell() {
  return (
    <>
      <Topbar />
      {/* ❌ plus aucun wrapper avec pt/padding */}
      <Outlet />
      <Footer />
    </>
  );
}
