import profile from "../assets/profile.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth";
import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";

const TransferConfirmation = () => {
  const { changeStatusTransfer, transferForm } = useAuth();
  const [dataUser, setDataUser] = useState("");
  const [dataTF, setDataTF] = useState("");

  const handleClick = () => {
    changeStatusTransfer("TransferPin");
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('https://kelompok5.serverku.org/api/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
          },
        });

        const data = await response.json();
        setDataUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setDataTF(JSON.parse(transferForm));
    fetchData();
  }, []);

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

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
        <p className="text-[#9F2BFB]">{'>'}</p>
        <p className="text-[#9F2BFB] underline">
          Confirmation
        </p>
      </div> */}

      <div className="pt-8">

      <div className="max-w-md mx-auto mt-2 p-8 rounded-3xl shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Confirmation</h2>

        <div className="mb-6">
          <p className="text-sm mb-1">Recipient</p>
          <div className="flex items-center p-4 border rounded-lg shadow-sm">
            {/* <img src={profile} alt="recipient" className="w-8 h-8 rounded-full mr-3" /> */}
            <CircleUserRound className="text-purple-600 w-10 h-10 mr-2" />
            <div>
              <p className="font-medium">{dataTF.accountName}</p>
              <p className="text-sm text-gray-500">{dataTF.toAccountnum}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm mb-1">Source of Fund</p>
          <div className="flex items-center p-4 border rounded-lg shadow-sm">
            {/* <img src={profile} alt="source" className="w-8 h-8 rounded-full mr-3" /> */}
            <CircleUserRound className="text-purple-600 w-10 h-10 mr-2" />
            <div>
              <p className="font-medium">{dataUser?.data?.fullname}</p>
              <p className="text-sm text-gray-500">{dataUser?.data?.accountnum}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-1">
          {/* <span className="text-sm">Notes</span> */}
          <span className="text-sm text-gray-400">-</span>
        </div>
        <div className="flex justify-between border-b pb-3 mb-6">
          <span className="text-sm">Amount</span>
          <span className="font-semibold">{formatRupiah(dataTF?.amount)}</span>
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

export default TransferConfirmation;
