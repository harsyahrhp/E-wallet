import { useState } from "react";
import { ChevronDown } from "lucide-react";
import walletLogo from "../assets/logo-wallet.png";
import { useAuth } from "../contexts/Auth";

const TopupForm = () => {
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("");
  const { changeStatusTopup } = useAuth();

  const handleClick = () => {
    changeStatusTopup('TopupMethod');
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-xl rounded-3xl p-6 text-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Topup</h2>

      <div className="flex justify-between items-center bg-white border shadow rounded-xl p-4 mb-2">
        <div className="flex items-center gap-3">
          {/* <div className="w-10 h-10 bg-purple-500 rounded-xl">
          </div> */}
            <img src={walletLogo} alt="wallet" className="w-10 h-10" />
          <div>
            <p className="text-sm">Wally Balance</p>
            <p className="font-semibold">Rp1.000.000</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Maximum Balance <strong className="text-gray-700">Rp20.000.000</strong>
      </p>

      <label className="block text-left mb-1 text-sm">Choose Topup Method</label>
      <div className="relative mb-4">
        <select
          className="w-full border shadow rounded-lg px-3 py-2 appearance-none focus:outline-none"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="">Choose Topup Method</option>
          <option value="bank">Bank Transfer</option>
          <option value="gopay">GoPay</option>
          <option value="ovo">OVO</option>
        </select>
        <ChevronDown className="absolute right-3 top-3 text-purple-500 pointer-events-none" />
      </div>

      <div className="bg-purple-100 p-4 rounded-xl text-left mb-4">
        <p className="text-sm text-gray-600 mb-1">Topup Amount</p>
        <p className="text-2xl font-bold">Rp{amount.toLocaleString('id-ID')}</p>
        <p className="text-xs text-gray-500 mt-1">Minimum Rp10.000</p>
      </div>

      <button className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white py-2 rounded-xl font-semibold"
      onClick={handleClick}>
        Next
      </button>
    </div>
  );
};

export default TopupForm;
