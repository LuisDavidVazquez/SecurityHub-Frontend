import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

interface HistoricalData {
  id: number;
  sensor_id: number;
  data_type: string;
  data: string;
  createdAt: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

interface HistoricalChartProps {
  dataType: string;
  color: string;
}

// Función para calcular la media
const calculateAverage = (data: number[]): string => {
  if (data.length === 0) return '0'; // Evitar división por cero
  const sum = data.reduce((acc, value) => acc + value, 0);
  return (sum / data.length).toFixed(2);
};

const HistoricalChart: React.FC<HistoricalChartProps> = ({ dataType, color }) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: dataType,
        data: [],
        borderColor: color,
        backgroundColor: `${color}20`,
        fill: false,
      },
    ],
  });
  const [average, setAverage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/sensor-data/${dataType}`);
        const data: HistoricalData[] = response.data;

        const labels = data.map(item => new Date(item.createdAt).toLocaleString());
        const values = data.map(item => parseFloat(item.data)); // Convertir a número

        setAverage(calculateAverage(values));

        setChartData({
          labels: labels,
          datasets: [
            {
              label: dataType,
              data: values,
              borderColor: color,
              backgroundColor: `${color}20`,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchData();
  }, [dataType, color]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: 'center' }}>
      <Line data={chartData} />
      <div className="stadistics-media">
        <h2>Media</h2>
        <h2>{average}</h2>
      </div>
    </div>
  );
};

export default HistoricalChart;
