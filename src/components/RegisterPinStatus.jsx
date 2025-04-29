import logo from "../assets/logo.svg";
import checkLogo from "../assets/check-logo.png";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth";

const RegisterStatus = () => {
  const { changeStatus, statusRegis } = useAuth();
  const [pin, setPin] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newPin = [...pin];
    newPin[index] = element.value;
    setPin(newPin);

    // Auto focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }

  };
  const handleClick = () => {
    changeStatus("RegisterForm")
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 rounded-3xl shadow-lg bg-white text-center">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Walled" src={logo} className="mx-auto h-10 w-auto" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-8">
        <img alt="checkLogo" src={checkLogo} className="mx-auto h-8 w-auto" />
      </div>

      <h2 className="text-2xl font-semibold mb-8 mt-4">Registration Successful</h2>


      <button
        className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white font-semibold py-2 rounded-lg"
        onClick={handleClick}
      >
        <NavLink to="/login">
          Go to your account
        </NavLink>
      </button>
    </div>
  );
};

export default RegisterStatus;
