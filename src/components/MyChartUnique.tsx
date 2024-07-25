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
const calculateAverage = (data: number[]) => {
  const sum = data.reduce((acc, value) => acc + value, 0);
  return (sum / data.length).toFixed(2);
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

  useEffect(() => {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const filteredData = sensorData.flatMap(item =>
      item.sensors.filter(sensor => sensor.dataType === dataType).map(sensor => sensor.data as number)
    );

    setAverage(calculateAverage(filteredData));

    setChartData((prevData) => ({
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
      <div className="stadistics-media">
        <h2>Media</h2>
        <h2>{average}</h2>
      </div>
    </div>
  );
};

export default MyChartUnique;
