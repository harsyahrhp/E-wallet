import Navbar from "../components/navbar";
import { useState, useEffect } from "react";

const DashboardPage = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const [dataUser, setDataUser] = useState("");

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
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const transactions = [
        {
            date: "10.04 - 20 April 2025",
            type: "Transfer",
            name: "Sandy Yuyu",
            notes: "Ganti Kopi",
            amount: 27000,
        },
        {
            date: "10.04 - 20 April 2025",
            type: "Topup",
            name: "Mei Mei",
            notes: "",
            amount: 27000,
        },
        {
            date: "10.04 - 20 April 2025",
            type: "Transfer",
            name: "Ahmad Jaelani",
            notes: "Text",
            amount: 27000,
        },
        {
            date: "10.04 - 20 April 2025",
            type: "Topup",
            name: "Mei Mei",
            notes: "",
            amount: 27000,
        },
        {
            date: "10.04 - 20 April 2025",
            type: "Transfer",
            name: "Ahmad Jaelani",
            notes: "",
            amount: 27000,
        },
        {
            date: "10.04 - 20 April 2025",
            type: "Topup",
            name: "Mei Mei",
            notes: "",
            amount: 27000,
        },
    ];


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
                    <div className="bg-gradient-to-br from-purple-600 to-purple-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-xs">
                        <p className="text-sm">Account Number:</p>
                        <p className="text-lg font-semibold">{dataUser?.data?.accountnum}</p>
                        <p className="mt-4 text-sm">Total Balance</p>
                        <p className="text-2xl font-bold">{formatRupiah(dataUser?.data?.balance)}</p>
                    </div>

                    {/* Financial Summary */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Your Financial Records</h3>
                            <p className="text-sm text-gray-500">1 Apr 2025 - 30 Apr 2025</p>
                        </div>
                        <div className="flex">
                            <div className="flex-1 border rounded-md p-4 shadow-sm text-green-600">
                                <p className="font-semibold">Income</p>
                                {/* <p>{formatRupiah(500000)}</p> */}
                            </div>
                            <div className="flex-1 border rounded-sm p-4 shadow-sm text-red-600">
                                <p className="font-semibold">Expense</p>
                                {/* <p>{formatRupiah(300000)}</p> */}
                            </div>
                        </div>
                        <p className="text-sm text-green-600">Difference {formatRupiah(200000)}</p>
                    </div>
                </div>

                {/* Transaction Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full table-auto text-sm border-separate border-spacing-y-2">
                        <thead className="text-left text-purple-700">
                            <tr>
                                <th>Date & Time</th>
                                <th>Type</th>
                                <th>From/To</th>
                                <th>Notes</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((trx, index) => (
                                <tr key={index} className="bg-white rounded-lg shadow-sm">
                                    <td>{trx.date}</td>
                                    <td>{trx.type}</td>
                                    <td>{trx.name}</td>
                                    <td>{trx.notes || "-"}</td>
                                    <td className={trx.type === "Topup" ? "text-green-500" : "text-red-500"}>
                                        {trx.type === "Topup" ? "+" : "-"}{formatRupiah(trx.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
