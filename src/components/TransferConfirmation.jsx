import profile from "../assets/profile.png";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth";

const TransferConfirmation = () => {
  const { changeStatusTransfer } = useAuth();
    const recipient = {
      name: "Ahmad Jaelani",
      account: "111777111777",
    };
  
    const source = {
      name: "Sandy Yuyu",
      account: "111888111888",
    };
  
    const amount = 100000;

    const handleClick = ()=>{
      changeStatusTransfer("TransferPin");
    }
  
    return (
      <>
      <div className="ml-5 mt-5 text-[14px] flex gap-2">
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
      </div>
      <div className="max-w-md mx-auto mt-2 p-8 rounded-3xl shadow-lg bg-white">
          <h2 className="text-2xl font-semibold text-center mb-6">Confirmation</h2>

          <div className="mb-6">
            <p className="text-sm mb-1">Recipient</p>
            <div className="flex items-center p-4 border rounded-lg shadow-sm">
              <img src={profile} alt="recipient" className="w-8 h-8 rounded-full mr-3" />
              <div>
                <p className="font-medium">{recipient.name}</p>
                <p className="text-sm text-gray-500">{recipient.account}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm mb-1">Source of Fund</p>
            <div className="flex items-center p-4 border rounded-lg shadow-sm">
              <img src={profile} alt="source" className="w-8 h-8 rounded-full mr-3" />
              <div>
                <p className="font-medium">{source.name}</p>
                <p className="text-sm text-gray-500">{source.account}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mb-1">
            <span className="text-sm">Notes</span>
            <span className="text-sm text-gray-400">-</span>
          </div>
          <div className="flex justify-between border-b pb-3 mb-6">
            <span className="text-sm">Amount</span>
            <span className="font-semibold">Rp{amount.toLocaleString("id-ID")}</span>
          </div>

          <button
            className="w-full bg-[#9F2BFB] hover:bg-[#8b23dc] text-white font-semibold py-2 rounded-lg"
            onClick={handleClick}
          >
            Confirm
          </button>
        </div></>
    );
  };
  
  export default TransferConfirmation;
  