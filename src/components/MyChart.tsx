import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

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

interface SensorData {
  userId: number;
  sensors: {
    sensorId: number;
    dataType: string;
    data: number | boolean;
    location: string;
  }[];
}

interface MyChartProps {
  sensorData: SensorData[];
}

const MyChart: React.FC<MyChartProps> = ({ sensorData }) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Temperatura',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Humedad',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
      {
        label: 'Ruido',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const newTemperatureData: number[] = [];
    const newHumidityData: number[] = [];
    const newNoiseData: number[] = [];

    sensorData.forEach(data => {
      data.sensors.forEach(sensor => {
        switch (sensor.dataType) {
          case 'temperatura':
            if (typeof sensor.data === 'number') newTemperatureData.push(sensor.data);
            break;
          case 'humedad':
            if (typeof sensor.data === 'number') newHumidityData.push(sensor.data);
            break;
          case 'sonido':
            if (typeof sensor.data === 'number') newNoiseData.push(sensor.data);
            break;
          default:
            break;
        }
      });
    });

    setChartData((prevData) => ({
      labels: [...prevData.labels, timeLabel].slice(-20),
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, ...newTemperatureData].slice(-20),
        },
        {
          ...prevData.datasets[1],
          data: [...prevData.datasets[1].data, ...newHumidityData].slice(-20),
        },
        {
          ...prevData.datasets[2],
          data: [...prevData.datasets[2].data, ...newNoiseData].slice(-20),
        },
      ],
    }));
  }, [sensorData]);

  return <Line data={chartData} />;
};

export default MyChart;
