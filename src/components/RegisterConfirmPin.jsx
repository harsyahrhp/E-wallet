import logo from "../assets/logo.svg";
import { useState } from "react";
import { useAuth } from "../contexts/Auth";
import { toast } from "react-toastify";

const RegisterConfirmPin = () => {
  const { changeStatus, statusRegis, accountnum, pinRegistration } = useAuth();
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

  const handleClick = async () => {
    if (pinRegistration.join() != pin.join()) {
      toast.error("Password Not Match");
      return
    }

    try {
      const response = await fetch('https://kelompok5.serverku.org/api/pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountnum: accountnum,
          pin: pin.join("")
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        changeStatus("RegisterStatus");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 rounded-3xl shadow-lg bg-white text-center">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Walled" src={logo} className="mx-auto h-10 w-auto" />
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-4">Re-enter PIN</h2>
      <p className="text-sm mb-6 text-gray-600">Re-enter your PIN!</p>

      <div className="flex justify-center gap-2 mb-4">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="password"
            maxLength="1"
            className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
          />
        ))}
      </div>

      <button
        className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white font-semibold py-2 rounded-lg"
        onClick={handleClick}
      >
        Confirm
      </button>
    </div>
  );
};

export default RegisterConfirmPin;
