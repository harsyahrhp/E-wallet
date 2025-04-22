import { useState } from "react";
import walletLogo from "../assets/logo-wallet.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth";

const TransferForm = () => {
  const { changeStatusTransfer } = useAuth();
  const [accountNumber, setAccountNumber] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClick = () => {
    changeStatusTransfer('TransferConfirmation');
  }

  return (
    <>
      <div className="ml-5 mt-5 text-[14px] flex gap-2">
        <p className="">
          <NavLink to="/" className="text-[#ABA7AF]">
            Dashboard
          </NavLink>
        </p >
        <p className="text-[#9F2BFB]">{'>'}</p>
        <p className="text-[#9F2BFB] underline">
          Transfer
        </p>
      </div>
      <div className="max-w-md mx-auto mt-2 p-8 rounded-3xl shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Transfer</h2>

        <label className="block mb-2 text-sm font-medium">Input Account Number</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-500 py-2 mb-6"
          placeholder="Account Number" />

        <p className="text-sm mb-2">Source of Fund</p>
        <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <img src={walletLogo} alt="wallet" className="w-10 h-10" />
            <span className="font-medium">Wally Balance</span>
          </div>
          <span className="font-semibold">Rp1.000.000</span>
        </div>

        <div className="mb-6 border rounded-lg p-4 bg-purple-50">
          <p className="text-xs text-gray-700 mb-1">Transfer Amount</p>
          <div className="flex">

            <p className="text-2xl font-bold text-purple-800">Rp{transferAmount}</p>

            <input
              type="number"
              value={transferAmount}
              min={10000}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="bg-purple-50 text-2xl font-bold text-purple-800 focus:outline-none" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Minimum Rp10.000</p>
        </div>

        {/* <label className="block mb-2 text-sm font-medium">Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-500 py-2 mb-6"
          placeholder="08xxxxxx" /> */}

        <button
          className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white font-semibold py-2 rounded-lg"
          onClick={handleClick}
        >
          Next
        </button>
      </div></>
  );
};

export default TransferForm;
