
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function StockChart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Stock Price",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
    symbol: "",
  });

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5001/stock-data");
    eventSource.onmessage = (event) => {
      const stockData = JSON.parse(event.data);
      const newTime = new Date(stockData.datetime).toLocaleTimeString();

      setData((prevData) => ({
        labels: [...prevData.labels, newTime].slice(-10),
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, stockData.close].slice(-10),
          },
        ],
        symbol: stockData.symbol,
      }));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div style={{ width: "90%", height: "90vh" }}>
      <h2>Live Stock Prices for {data.symbol}</h2>
      <Line
        data={data}
        options={{
          scales: {
            x: { title: { display: true, text: "Time" } },
            y: { title: { display: true, text: "Price (USD)" } },
          },
        }}
      />
    </div>
  );
}

export default StockChart;
