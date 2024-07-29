import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface SensorData {
  userId: number;
  sensors: {
    sensorId: number;
    dataType: string;
    data: number | boolean;
    location: string;
  }[];
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

interface MyChartProps {
  sensorData: SensorData[];
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
  const mean = parseFloat(calculateAverage(data));
  const variance = data.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / data.length;
  return Math.sqrt(variance).toFixed(2);
};

const MyChartUnique: React.FC<MyChartProps> = ({ sensorData, dataType, color }) => {
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
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    // Filtrar y mapear los datos relevantes
    const filteredData = sensorData.flatMap(item =>
      item.sensors.filter(sensor => sensor.dataType === dataType).map(sensor => sensor.data as number)
    );

    // Calcular estadísticas
    setAverage(calculateAverage(filteredData));
    setMode(calculateMode(filteredData));
    setStandardDeviation(calculateStandardDeviation(filteredData));

    // Actualizar datos del gráfico
    setChartData(prevData => ({
      labels: [...prevData.labels, timeLabel].slice(-20),
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, ...filteredData].slice(-20),
        },
      ],
    }));
  }, [sensorData, dataType, color]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: 'center' }}>
      <Line data={chartData} />
      <br />
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

export default MyChartUnique;
