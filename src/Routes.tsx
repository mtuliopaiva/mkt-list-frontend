import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ForgotPasswordPage from "./pages/Auth/ForgotPassword";
import DashboardPage from "./pages/admin/Dashboard";
import ProductsList from "./pages/admin/Products/ProductsList";
import ProductsCreate from "./pages/admin/Products/ProductsCreate";
import ProductsDetail from "./pages/admin/Products/ProductsDetail";
import ClientsList from "./pages/admin/Clients/ClientsList";
import ClientsCreate from "./pages/admin/Clients/ClientsCreate";
import ClientsDetail from "./pages/admin/Clients/ClientsDetail";
import SettingsPage from "./pages/admin/Settings";


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/products" element={<ProductsList />} />
        <Route path="/admin/products/create" element={<ProductsCreate />} />
        <Route path="/admin/products/edit/:id" element={<ProductsDetail />} />
        <Route path="/admin/products/view/:id" element={<ProductsDetail />} />
        <Route path="/admin/clients" element={<ClientsList />} />
        <Route path="/admin/clients/create" element={<ClientsCreate />} />
        <Route path="/admin/clients/edit/:id" element={<ClientsDetail />} />
        <Route path="/admin/clients/view/:id" element={<ClientsDetail />} />
        <Route path="/admin/settings" element={<SettingsPage />} />

        {/* Client Routes */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
