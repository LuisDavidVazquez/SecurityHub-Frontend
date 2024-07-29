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

// Función para calcular la moda
const calculateMode = (data: number[]): string => {
  if (data.length === 0) return '0'; // Evitar división por cero
  const frequency: { [key: number]: number } = {};
  data.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  const maxFrequency = Math.max(...Object.values(frequency));
  const modes = Object.keys(frequency).filter(key => frequency[+key] === maxFrequency);
  return modes.join(', ');
};

// Función para calcular la desviación estándar
const calculateStandardDeviation = (data: number[]): string => {
  if (data.length === 0) return '0'; // Evitar división por cero
  const mean = calculateAverage(data);
  const variance = data.reduce((acc, value) => acc + Math.pow(value - parseFloat(mean), 2), 0) / data.length;
  return Math.sqrt(variance).toFixed(2);
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
  const [mode, setMode] = useState<string | null>(null);
  const [standardDeviation, setStandardDeviation] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/sensor-data/${dataType}`);
        const data: HistoricalData[] = response.data;

        const labels = data.map(item => new Date(item.createdAt).toLocaleString());
        const values = data.map(item => parseFloat(item.data)); // Convertir a número

        setAverage(calculateAverage(values));
        setMode(calculateMode(values));
        setStandardDeviation(calculateStandardDeviation(values));

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
        <h2>Media:</h2>
        <h2>{average}</h2>
      </div>
      <h3>El promedio de todos los datos obtenidos</h3><br />
      <div className="stadistics-media">
        <h2>Moda:</h2>
        <h2>{mode}</h2>
      </div>
      <h3>El dato que se repite con más frecuencia</h3><br />
      <div className="stadistics-media">
        <h2>Desviación Estándar:</h2>
        <h2>{standardDeviation}</h2>
      </div>
      <h3>Mide la variabilidad o dispersión de los datos.</h3><br />
    </div>
  );
};

export default HistoricalChart;
