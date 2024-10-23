import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchChartData } from '../services/api'; 
import { Chart, registerables } from 'chart.js'; 
import "./EnergyChart.css"
Chart.register(...registerables); 

const EnergyChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchChartData();
                console.log(data);
                
                if (data && data.length > 0) {
                    const dates = data.map(item => new Date(item.createdAt).toLocaleDateString());
                    const energy = data.map(item => item.total_kwh || 0);

                    setChartData({
                        labels: dates,
                        datasets: [
                            {
                                label: 'Energy Consumption (kWh)', 
                                data: energy,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 2,
                                fill: false,
                            },
                        ],
                    });
                } else {
                    setError("No data available.");
                }
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data.");
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) {
        return <p className="loading-message">Loading chart...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="energy-chart-container">
            <h2>Energy Consumption Over Time</h2>
            <Bar data={chartData} options={{ responsive: true }} />
        </div>
    );
};

export default EnergyChart;