import { CheckCircle } from "lucide-react";
import profile from "../assets/profile.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth";
import { useEffect } from "react";
import { CircleUserRound } from "lucide-react";

const TopupStatus = () => {
  const { changeStatusTopup, topupStatus, setTopupStatus } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    changeStatusTopup("TopupForm");
  }

  const now = new Date();

  const day = now.getDate();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  const formatted = `${day} ${month} ${year}, ${hours}.${minutes}`;

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <>

    <div className="pt-10">

      <div className="max-w-sm mx-auto p-8 rounded-3xl shadow-lg bg-white text-center">
        <CheckCircle className="mx-auto text-green-500" size={48} />
        <h2 className="text-2xl font-semibold mt-4">Topup Successful</h2>
        <p className="text-gray-500 mb-8">{formatted}</p>

        <div className="text-left space-y-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">{topupStatus.method}</p>
            <div className="flex items-center gap-3 p-3 border rounded-lg shadow-sm">
              <CircleUserRound className="text-purple-600 w-10 h-10 mr-2" />

              <div>
                <p className="font-medium">{topupStatus.cardNumber}</p>
                <p className="text-gray-500 text-sm">EXP{topupStatus.expirationDate}</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Amount <span className="float-right font-semibold text-black">{formatRupiah(topupStatus.amount)}</span></p>
          </div>
        </div>

        <button className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white font-semibold py-2 rounded-lg mt-4"
          onClick={handleClick}>
          <NavLink to="/" >
            Back to dashboard
          </NavLink>
        </button>
      </div>
    </div>
      </>
  );
};

export default TopupStatus;
