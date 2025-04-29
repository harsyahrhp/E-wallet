import NavbarPage from "../components/NavbarPage";
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
    const [loadingFinance, setLoadingFinance] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    const toggleBalance = () => {
        setShowBalance(prev => !prev);
    };

    const toggleBalanceFinance = () => {
        setShowBalanceFinance(prev => !prev);
    };

    const fetchData = async () => {
        setLoadingData(true)
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
        finally{
            setLoadingData(false)
        }
    };

    const financeData = async () => {
        setLoadingFinance(true)
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('https://kelompok5.serverku.org/api/transactions/summary/this_month', {
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
        finally{
            setLoadingFinance(false)
        }
    };

    useEffect(() => {
        fetchData();
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
            <NavbarPage />

            <div className="p-6 dark:bg-black">
                {loadingData ? <h2 className="text-xl font-semibold dark:text-purple-600">Assalamualaikum,</h2> :
                    <h2 className="text-xl font-semibold dark:text-purple-600">Assalamualaikum, {dataUser?.data?.fullname}!</h2>}
                <p className="text-sm text-gray-500">Your wallet’s all set and secure. Bismillah, let’s get started.</p>

                <div className="flex flex-wrap gap-4 mt-5">
                    <div className="flex items-center bg-gradient-to-br from-purple-600 to-purple-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-xs">
                        <div>
                            <p className="text-sm">Account Number:</p>
                            {loadingData ? <p className="text-lg font-semibold animate-pulse">Loading...</p> : <p className="text-lg font-semibold">{dataUser?.data?.accountnum}</p>}
                            <p className="mt-4 text-sm">Total Balance</p>
                            <div className="flex">
                                {loadingData ? <p className="text-2xl font-bold animate-pulse">Loading...</p> : <p className="text-2xl font-bold">{showBalance ? formatRupiah(dataUser?.data?.balance) : "***********"}</p> }
                                <button onClick={toggleBalance} className="text-white ml-2">
                                    {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 ml-8">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-semibold dark:text-purple-600">Your Financial Records</h3>
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
                                    {loadingFinance ? <p className="animate-pulse">Loading...</p> : <p>{showBalanceFinace ? (formatRupiah(dataFinance?.data?.totalIncome)) : "*********"}</p>}
                                </div>
                            </div>
                            <div className="flex w-1/2 border rounded-md p-4 shadow-sm text-red-600 justify-center items-center">
                                <div>
                                    <div className="flex gap-2">
                                        <LogIn className="text-red-600" />
                                        <p className="font-semibold">Expense</p>
                                    </div>
                                    {loadingFinance ? <p className="animate-pulse">Loading...</p> : <p>{showBalanceFinace ? formatRupiah(dataFinance?.data?.totalExpense) : "***********"}</p>}
                                </div>
                            </div>
                        </div>
                        {loadingFinance ? <p className="animate-pulse">Loading...</p> :  <p className="text-sm text-green-600">Difference {showBalanceFinace ? (formatRupiah(dataFinance?.data?.totalIncome - dataFinance?.data?.totalExpense)) : "***********"}</p>}
                       
                    </div>
                </div>

                <h2 className="font-semibold text-lg mt-8 mb-1">Your Money Reports</h2>
                <div className="flex flex-wrap gap-8">
                    <DashboardDonutChart />

                    <DashboardLineChart />
                </div>


                <DashboardTable />
            </div>
        </>
    );
};

export default DashboardPage;
