import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DashboardTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setlimit] = useState(5);

    const fetchTransactions = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append("search", searchTerm);
            if (filterType !== "All") params.append("sortBy", filterType);
            if (startDate) params.append("dateStart", startDate);
            if (endDate) params.append("dateEnd", endDate);
            params.append("page", page);
            params.append("size", limit);

            const response = await fetch(`http://localhost:8080/api/transactions/me?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                },
            });

            const data = await response.json();
            setTransactions(data.data.transactions);
            setTotalPages(data.data.totalPages); // 🛑 Hitung total pages
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [searchTerm, filterType, startDate, endDate, page, limit]);

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <>
            {/* Filter Inputs */}
            <div className="flex justify-between items-center mb-2 mt-12">
                <div>
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="border border-gray-300 p-2 rounded-md w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <select
                            className="w-full border shadow rounded-lg px-8 pl-4 py-2 appearance-none focus:outline-none"
                            value={limit}
                            onChange={(e) => setlimit(e.target.value)}
                        >
                            <option value="5">Show 5 Transaction</option>
                            <option value="10">Show 10 Transaction</option>
                            <option value="20">Show 20 Transaction</option>
                            <option value="50">Show 50 Transaction</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 text-purple-500 pointer-events-none" />
                    </div>
                    <input
                        type="date"
                        className="border border-gray-300 p-2 rounded-md mr-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        className="border border-gray-300 p-2 rounded-md"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <h2 className="font-semibold text-lg mb-2">Your Transaction History</h2>

            <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm border-separate border-spacing-y-2">
                    <thead className="text-left text-purple-700 bg-[#F0E8FF]">
                        <tr className="h-9">
                            <th>Date & Time</th>
                            <th>Type</th>
                            <th>From/To</th>
                            <th>Notes</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">Loading...</td>
                            </tr>
                        ) : transactions?.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No transactions found.</td>
                            </tr>
                        ) : (
                            transactions.map((trx) => (
                                <tr key={trx.id} className="bg-white rounded-lg shadow-sm">
                                    <td>{new Date(trx.dateTime).toLocaleString("id-ID", {
                                        dateStyle: "short",
                                        timeStyle: "short"
                                    })}</td>
                                    <td>{trx.type === "income" ? "Topup" : "Transfer"}</td>
                                    <td>{trx.fromTo}</td>
                                    <td>{trx.description || "-"}</td>
                                    <td className={trx.type === "income" ? "text-green-500" : "text-red-500"}>
                                        {trx.type === "income" ? "+" : "-"}{formatRupiah(trx.amount)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default DashboardTable;
