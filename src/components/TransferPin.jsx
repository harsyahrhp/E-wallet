import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

const TransferPin = () => {
  const { changeStatusTransfer, transferForm, transferStatus, setTransferStatus } = useAuth();
  const [pin, setPin] = useState(new Array(6).fill(""));
  const [dataTF, setDataTF] = useState();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newPin = [...pin];
    newPin[index] = element.value;
    setPin(newPin);

    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };
  useEffect(() => {

    setDataTF(JSON.parse(transferForm));
  }, [])

  const handleClick = async () => {
    dataTF.pin = pin.join("");

    const token = localStorage.getItem("token");
    try {
      const response = await fetch('https://kelompok5.serverku.org/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(dataTF)
      });

      const data = await response.json();

      if (response.ok) {
        setTransferStatus(data)
        toast.success(data.message);
        changeStatusTransfer("TransferStatus");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  }

  return (
    <>
      <div className="pt-8">
        <div className="max-w-sm mx-auto mt-2 p-8 rounded-3xl shadow-lg bg-white text-center">
          <h2 className="text-2xl font-semibold mb-4">PIN</h2>
          <p className="text-sm mb-6 text-gray-600">Enter PIN</p>

          <div className="flex justify-center gap-2 mb-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                type="password"
                maxLength="1"
                className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                value={digit}
                onChange={(e) => handleChange(e.target, index)} />
            ))}
          </div>

          <button
            className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white font-semibold py-2 rounded-lg"
            onClick={handleClick}
          >
            Confirm
          </button>
        </div>
      </div>

    </>
  );
};

export default TransferPin;
