import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './contexts/Auth';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <StrictMode> */}
    <AuthProvider>
      <AppRoutes></AppRoutes>
    </AuthProvider>
    {/* </StrictMode> */}
  </BrowserRouter>
);
