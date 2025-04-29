import { useEffect, useRef, useState } from "react"
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

const DashboardDonutChart = () => {
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
    const doughnutRef = useRef(null);
    const donutChartInstance = useRef(null);
    const [dataFinance, setDataFinance] = useState("");
    const [loadingFinance, setLoadingFinance] = useState(true);

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
        finally {
            setLoadingFinance(false)
        }
    };
    useEffect(() => {

        financeData();
    }, [])

    useEffect(() => {
        setTimeout(() => {

            if (!dataFinance?.data || !doughnutRef.current) return;

            if (donutChartInstance.current) {
                donutChartInstance.current.destroy();
            }

            const doughnutCtx = doughnutRef.current.getContext('2d');

            const colors = ['#F0E8FF', '#3A1D6E'];

            donutChartInstance.current = new Chart(doughnutCtx, {
                type: 'doughnut',
                data: {
                    labels: ["Income", "Expense"],
                    datasets: [{
                        label: 'Amount',
                        data: [dataFinance?.data?.totalIncome, dataFinance?.data?.totalExpense],
                        backgroundColor: colors,
                        hoverOffset: 8,
                        borderWidth: 2,
                        borderColor: '#fff',
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#374151', // Gray
                                font: {
                                    size: 12,
                                    weight: '500',
                                },
                                padding: 20
                            }
                        },
                        title: {
                            display: false,
                            text: 'Income vs Expense',
                            color: '#111827',
                            font: {
                                size: 16,
                                weight: '600'
                            },
                            padding: {
                                top: 10,
                                bottom: 20
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const value = context.parsed;
                                    return ` ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}`;
                                }
                            }
                        }
                    }
                }
            }, 100);
        });
    }, [dataFinance]);


    return (
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow w-72">
            <p className="mt-4 font-semibold">This Month</p>
            {loadingFinance ? <div className="animate-pulse">Loading...</div> : <canvas ref={doughnutRef} width={200} height={100}></canvas>}
        </div>
    )
}

export default DashboardDonutChart