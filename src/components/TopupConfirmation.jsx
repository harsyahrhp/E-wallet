// import { CheckCircle } from "lucide-react";
import profile from "../assets/profile.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth";
import { CircleUserRound } from "lucide-react";

const TopupConfirmation = () => {
  const { changeStatusTopup } = useAuth();
  const handleClick = () => {
    changeStatusTopup("TopupStatus");
  }

  const amount = 100000;

  return (
    <>
      <div className="max-w-sm mx-auto mt-10 p-8 rounded-3xl shadow-lg bg-white text-center">
        <h2 className="text-2xl font-semibold mt-4">Confirmation</h2>

        <div className="text-left space-y-4 mb-4">
          <div className="mt-2">
            <p className="text-sm text-gray-500">Debit Card Topup</p>
            <div className="flex items-center gap-3 p-3 border rounded-lg shadow-sm">
              <CircleUserRound className="text-purple-600" />
              <div className="text-gray-500 text-sm">
                <p>111888111888</p>
                <p>EXP 05-2020</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between border-b pb-3 mb-6">
            <span className="text-sm">Amount</span>
            <span className="font-semibold">Rp{amount.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <button className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white font-semibold py-2 rounded-lg mt-4"
          onClick={handleClick}>
            Confirm
        </button>
      </div></>
  );
};

export default TopupConfirmation;
