import { Routes, Route, Navigate } from "react-router-dom";

import PublicShell from "./layout/PublicShell";
import RequireAuth from "./auth/RequireAuth";
import Shell from "./layout/Shell";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import NewInvoice from "./pages/NewInvoice";

export default function App() {
  return (
    <Routes>
      {/* ----- Routes publiques avec Topbar (blur) ----- */}
      <Route element={<PublicShell />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* ----- Espace appli protégé ----- */}
      <Route
        path="/app"
        element={
          <RequireAuth>
            <Shell />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="supplier/invoices/new" element={<NewInvoice />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
