import logo from "../assets/logo.svg";
import authBanner from "../assets/auth-picture.jpg";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import RegisterForm from "../components/RegisterForm";
import RegisterPin from "../components/RegisterPin";
import RegisterConfirmPin from "../components/RegisterConfirmPin";
import RegisterStatus from "../components/RegisterPinStatus";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/Auth";

const RegisterPage = () => {
  const { changeStatus, statusRegis } = useAuth();

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
       {statusRegis === 'RegisterForm' && <RegisterForm />}
       {statusRegis === 'RegisterPin' && <RegisterPin />}
       {statusRegis === 'RegisterConfirmPin' && <RegisterConfirmPin />}
       {statusRegis === 'RegisterStatus' && <RegisterStatus />}
       {/* <RegisterPin /> */}
       {/* <RegisterConfirmPin /> */}
       {/* <RegisterStatus /> */}
      </div>

      <div className="w-1/2">
        <img className="h-full object-cover" src={authBanner} alt="" />
      </div>
    </div>
  );
};

export default RegisterPage;
