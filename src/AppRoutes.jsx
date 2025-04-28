import { Routes, Route } from "react-router";
import App from "./App";
import TransferPage from "./pages/Transfer";
import TopUpPage from "./pages/Topup";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AppRoutes() {
    return (
        <><ToastContainer position="top-right" autoClose={3000} /><Routes>
            <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/transfer" element={<ProtectedRoute><TransferPage /></ProtectedRoute>} />
            <Route path="/topup" element={<ProtectedRoute><TopUpPage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes></>
    );
}
