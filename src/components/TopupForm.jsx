import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import walletLogo from "../assets/logo-wallet.png";
import { useAuth } from "../contexts/Auth";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";


const TopupForm = () => {
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [expired, setExpired] = useState("");
  const [cvv, setCvv] = useState("");
  const { changeStatusTopup, topupForm, setTopupForm, topupStatus, setTopupStatus } = useAuth();
  const [dataUser, setDataUser] = useState("");
  const navigate = useNavigate();

  const isFormValid = (method == "Debit" || method == "Credit" || method =="") ? cardNumber == "" || expired == "" || cvv == "" : false


  const handleClick = () => {
    if (method == "") {
      toast.error("Please Input Method");
      return
    } else if (amount == "") {
      toast.error("Please Input Amount");
      return
    } 
    // else if (amount > dataUser?.data?.balance) {
    //   toast.error("Please Input Amount Not More Than Balance");
    //   return
    // }

    let topupData = {
      "accountnum": dataUser?.data?.accountnum,
      "amount": amount,
      "method": method,
      "cardNumber": cardNumber,
      "cvv": cvv,
      "expirationDate": expired
    }

    setTopupForm(topupData)

    const submitData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:8080/api/topup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(topupData)
        });

        const data = await response.json();
        if(data.message == 'JWT token expired'){
          toast.error("Sesion Expired");
          navigate("/login");
        }

        if (response.ok) {
          setTopupStatus(topupData)
          toast.success(data.message);
          changeStatusTopup("TopupStatus");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }

    submitData();

  }
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const parseRupiah = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  useEffect(() => {
    setCvv("")
    setExpired("")
    setcardNumber("")
  }, [method])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:8080/api/users/me', {
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

    fetchData();
  }, []);

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
            <p className="font-semibold text-left">{formatRupiah(dataUser?.data?.balance)}</p>
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
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
          {/* <option value="ovo">QR</option> */}
        </select>

        <ChevronDown className="absolute right-3 top-3 text-purple-500 pointer-events-none" />
      </div>

      <div className="bg-purple-100 p-4 rounded-xl text-left mb-4">
        <p className="text-sm text-gray-600 mb-1">Topup Amount</p>
        {/* <p className="text-2xl font-bold">Rp{amount.toLocaleString('id-ID')}</p> */}
        <div className="flex overflow-hidden max-w-full">

          <input
            type="text"
            value={formatRupiah(amount)}
            min={10000}
            onChange={(e) => {
              const rawValue = parseRupiah(e?.target?.value);
              setAmount(rawValue);
            }}
            className="bg-purple-100 text-2xl font-bold text-purple-800 focus:outline-none" />

        </div>
        <p className="text-xs text-gray-500 mt-1">Minimum Rp10.000</p>
      </div>


      {(method == "Debit" || method == "Credit") &&

        <div>
          <p className="text-left text-purple-800 text-xl font-bold">Card Information</p>
          <input
            type="number"
            value={cardNumber}
            min={10000}
            onChange={(e) => setcardNumber(e.target.value)}
            placeholder="Card Number"
            className="w-full mt-2 p-1 border-b border-purple-400 bg-transparent focus:outline-none" />
          <input
            type="text"
            value={expired}
            min={10000}
            onChange={(e) => setExpired(e.target.value)}
            placeholder="MM/YY"
            className="w-full mt-2 p-1 border-b border-purple-400 bg-transparent focus:outline-none" />
          <input
            type="number"
            value={cvv}
            min={10000}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
            className="w-full mt-2 p-1 border-b border-purple-400 bg-transparent focus:outline-none" />
        </div>
      }

      <button className={`w-full mt-5 py-2 rounded-xl font-semibold ${ !isFormValid
          ? "bg-[#9F2BFB] hover:bg-[#8b23dc] text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleClick} disabled={isFormValid}>
        Next
      </button>
    </div>
  );
};

export default TopupForm;
