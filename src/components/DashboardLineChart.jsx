import { Chart, DoughnutController, ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { useEffect, useRef, useState } from 'react';

const DashboardLineChart = () => {
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
    const [dataLineChart, setDataLineChart] = useState();
    const lineRef = useRef(null);
    const lineChartInstance = useRef(null);

    useEffect(() => {
        const getLineChart = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch('http://localhost:8080/api/transactions/summary/monthly_chart', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + token
                    },
                });

                const data = await response.json();
                setDataLineChart(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getLineChart()
    }, [])

    useEffect(() => {
        if (!dataLineChart?.data || !lineRef.current) return;

        if (lineChartInstance.current) {
            lineChartInstance.current.destroy(); // 🔥 Destroy dulu yang lama
        }

        const lineCtx = lineRef.current.getContext('2d');

        lineChartInstance.current = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: dataLineChart.data.labels,
                datasets: dataLineChart.data.datasets
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: 'Annual Report' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 0,
                        },
                    },
                }
            }
        });
    }, [dataLineChart]);
    return (
        <div className="flex-1 bg-white p-4 rounded-xl shadow">
            <canvas ref={lineRef} height={100}></canvas>
        </div>
    )
}

export default DashboardLineChart
