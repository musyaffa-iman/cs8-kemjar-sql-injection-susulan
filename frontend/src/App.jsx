import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { session } from "./lib/api";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CheckPasswordPage from "./pages/CheckPasswordPage";
import ValidateFlagPage from "./pages/ValidateFlagPage";
import NotFoundPage from "./pages/NotFoundPage";

function Private({ children }) {
  return session.get() ? <Layout>{children}</Layout> : <Navigate to="/" replace />;
}

function Guest({ children }) {
  return session.get() ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Guest><LoginPage /></Guest>} />
        <Route path="/dashboard" element={<Private><DashboardPage /></Private>} />
        <Route path="/check-password" element={<Private><CheckPasswordPage /></Private>} />
        <Route path="/validate-flag" element={<Private><ValidateFlagPage /></Private>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
