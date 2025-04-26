import Navbar from "../components/navbar";
import { useState, useEffect, useRef } from "react";
import DashboardTable from "../components/DashboardTable";
import { LogIn, Eye, EyeOff } from "lucide-react";
import DashboardDonutChart from "../components/DashboardDonutChart";
import DashboardLineChart from "../components/DashboardLineChart";

const DashboardPage = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const [dataUser, setDataUser] = useState("");
    const [dataFinance, setDataFinance] = useState("");
    const [showBalance, setShowBalance] = useState(true);
    const [showBalanceFinace, setShowBalanceFinance] = useState(true);

    const toggleBalance = () => {
        setShowBalance(prev => !prev);
    };

    const toggleBalanceFinance = () => {
        setShowBalanceFinance(prev => !prev);
    };

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

        const financeData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch('http://localhost:8080/api/transactions/summary/this_month', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + token
                    },
                });

                const data = await response.json();
                setDataFinance(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        financeData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const thirtyDaysAgo = new Date(dateTime);
    thirtyDaysAgo.setDate(dateTime.getDate() - (dateTime.getDate() - 1));

    const formattedStartDate = thirtyDaysAgo.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const formattedEndDate = dateTime.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <>
            <Navbar />
            {/* <p>
                {formattedStartDate} - {formattedEndDate}
            </p> */}

            <div className="p-6">
                {/* Header */}
                <h2 className="text-xl font-semibold">Welcome, {dataUser?.data?.fullname}!</h2>
                <p className="text-sm text-gray-500">Your wallet’s all set and secure. Let’s get started.</p>

                <div className="flex flex-wrap gap-4 mt-5">
                    {/* Account Info */}
                    <div className="flex items-center bg-gradient-to-br from-purple-600 to-purple-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-xs">
                        <div>
                            <p className="text-sm">Account Number:</p>
                            <p className="text-lg font-semibold">{dataUser?.data?.accountnum}</p>
                            <p className="mt-4 text-sm">Total Balance</p>
                            <div className="flex">
                                <p className="text-2xl font-bold">{showBalance ? formatRupiah(dataUser?.data?.balance) : "***********"}</p>
                                <button onClick={toggleBalance} className="text-white ml-2">
                                    {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="flex-1 space-y-4 ml-8">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Your Financial Records</h3>
                                <p className="text-sm text-gray-500">{formattedStartDate} - {formattedEndDate}</p>
                            </div>

                            <div className="flex items-end">
                                <button onClick={toggleBalanceFinance} className="text-purple-600">
                                    {showBalanceFinace ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <div className="flex w-1/2 border rounded-md p-4 shadow-sm text-green-600 justify-center items-center">
                                <div>
                                    <div className="flex gap-2">
                                        <LogIn className="text-green-600" />
                                        <p className="font-semibold">Income</p>
                                    </div>
                                    <p>{showBalanceFinace ? (formatRupiah(dataFinance?.data?.totalIncome)) : "*********"}</p>
                                </div>
                            </div>
                            <div className="flex w-1/2 border rounded-md p-4 shadow-sm text-red-600 justify-center items-center">
                                <div>
                                    <div className="flex gap-2">
                                        <LogIn className="text-red-600" />
                                        <p className="font-semibold">Expense</p>
                                    </div>
                                    <p>{showBalanceFinace ? formatRupiah(dataFinance?.data?.totalExpense): "***********"}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-green-600">Difference {showBalanceFinace ? (formatRupiah(dataFinance?.data?.totalIncome - dataFinance?.data?.totalExpense)) : "***********"}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-8 mt-8">

                    <DashboardDonutChart />

                    <DashboardLineChart />
                </div>


                <DashboardTable />
            </div>
        </>
    );
};

export default DashboardPage;
