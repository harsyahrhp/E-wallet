import { useEffect, useState } from "react";
import walletLogo from "../assets/logo-wallet.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const TransferForm = () => {
  const { changeStatusTransfer,transferForm, setTransferForm } = useAuth();
  const [accountNumber, setAccountNumber] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [dataUser, setDataUser] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [dataTransferUser, setDataTransferUser] = useState();

  const handleClick = () => {
    if(accountNumber == ""){
      toast.error("Please Input Account Number");
      return
    }else if(transferAmount == ""){
      toast.error("Please Input Amount");
      return
    }else if(transferAmount > dataUser?.data?.balance){
      toast.error("Please Input Amount Not More Than Balance");
      return
    }
    changeStatusTransfer('TransferConfirmation');

    let toAccount = accountNumber?.split(" - ");
    let test = JSON.stringify({
      fromAccountnum: dataUser?.data?.accountnum,
      toAccountnum: toAccount[0],
      amount: transferAmount,
      description: "",
      pin: "",
      accountName: toAccount[1]
    });
    setTransferForm(test)
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:8080/api/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "token": token
          },
        });

        const data = await response.json();
        setDataUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const fetchTransferData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:8080/api/users/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "token": token
          },
        });

        const data = await response.json();
        setDataTransferUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTransferData();
  }, []);


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

        <div className="relative">
          <select
            className="w-full border shadow rounded-lg px-3 py-2 appearance-none focus:outline-none"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          >
            <option value="">Choose Account Number</option>
            {dataTransferUser?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none" />
        </div>

        <p className="text-sm mb-2 mt-2">Source of Fund</p>

        <div className="flex justify-between items-center bg-white border shadow rounded-xl p-4 mb-2">
          <div className="flex items-center gap-3">
            <img src={walletLogo} alt="wallet" className="w-10 h-10" />
            <div>
              <p className="text-sm">Wally Balance</p>
              <p className="font-semibold">{dataUser?.data?.balance}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 border rounded-lg p-4 bg-purple-50">
          <p className="text-xs text-gray-700 mb-1">Transfer Amount</p>
          <div className="flex">

            <p className="text-2xl font-bold text-purple-800">Rp</p>

            <input
              type="number"
              value={transferAmount}
              min={10000}
              onChange={(e) => setTransferAmount(e?.target?.value)}
              className="bg-purple-50 text-2xl font-bold text-purple-800 focus:outline-none" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Minimum Rp10.000</p>
        </div>

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
