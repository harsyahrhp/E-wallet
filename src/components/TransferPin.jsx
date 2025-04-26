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

    // Auto focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };
  useEffect(() => {

    setDataTF(JSON.parse(transferForm));
  }, [])

  const handleClick = async () => {
    dataTF.pin = pin.join("");
    // changeStatusTransfer("TransferStatus");

    const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:8080/api/transfer', {
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
      {/* <div className="ml-5 mt-5 text-[14px] flex gap-2">
        <p className="">
          <NavLink to="/" className="text-[#ABA7AF]">
            Dashboard
          </NavLink>
        </p>
        <p className="text-[#ABA7AF]">{'>'}</p>
        <p className="text-[#ABA7AF]">
          Transfer
        </p>
        <p className="text-[#ABA7AF]">{'>'}</p>
        <p className="text-[#ABA7AF]">
          Confirmation
        </p>
        <p className="text-[#9F2BFB]">{'>'}</p>
        <p className="text-[#9F2BFB] underline">
          PIN
        </p>
      </div> */}
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

        {/* <p className="text-sm text-gray-500 mb-6 cursor-pointer hover:text-purple-600">
          Forget PIN?
        </p> */}

        <button
          className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white font-semibold py-2 rounded-lg"
          onClick={handleClick}
        >
          Confirm
        </button>
      </div></>
  );
};

export default TransferPin;
