import { CheckCircle } from "lucide-react";
import profile from "../assets/profile.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth";

const TopupStatus = () => {
  const { changeStatusTopup } = useAuth();
  const handleClick = () => {
    changeStatusTopup("TopupForm");
  }
  return (
    <>
      <div className="max-w-sm mx-auto mt-10 p-8 rounded-3xl shadow-lg bg-white text-center">
        <CheckCircle className="mx-auto text-green-500" size={48} />
        <h2 className="text-2xl font-semibold mt-4">Topup Successful</h2>
        <p className="text-gray-500 mb-8">20 March 2025, 24.19</p>

        <div className="text-left space-y-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Debit Card Topup</p>
            <div className="flex items-center gap-3 p-3 border rounded-lg shadow-sm">
              <img src={profile} alt="Sender" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">Sandy Yuyu</p>
                <p className="text-gray-500 text-sm">111888111888</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Reference Number <span className="float-right">TRF20250420</span></p>
            <p>Amount <span className="float-right font-semibold text-black">Rp100.000</span></p>
          </div>
        </div>

        <button className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white font-semibold py-2 rounded-lg mt-4"
          onClick={handleClick}>
          <NavLink to="/" >
            Back to dashboard
          </NavLink>
        </button>
      </div></>
  );
};

export default TopupStatus;
