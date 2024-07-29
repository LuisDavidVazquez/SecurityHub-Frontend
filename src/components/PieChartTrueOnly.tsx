import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface SensorData {
  id: number;
  sensor_id: number;
  data_type: string;
  data: string;
  createdAt: string;
}

interface PieChartTrueOnlyProps {
  dataType1: string; // "movimiento"
  dataType2: string; // "fuego"
  color1: string;
  color2: string;
}

const PieChartTrueOnly: React.FC<PieChartTrueOnlyProps> = ({ dataType1, dataType2, color1, color2 }) => {
  const [data, setData] = useState<{ [key: string]: number }>({});
  const [probabilities, setProbabilities] = useState<{ [key: string]: string }>({});

  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get<SensorData[]>(`${url}/sensor-data/${dataType1}`);
        const response2 = await axios.get<SensorData[]>(`${url}/sensor-data/${dataType2}`);

        const data1 = response1.data;
        const data2 = response2.data;

        // Contar los valores "true"
        const countTrue1 = data1.filter((item) => item.data === 'true').length;
        const countTrue2 = data2.filter((item) => item.data === 'true').length;
        const count = countTrue1 + countTrue2

        // Calcular la probabilidad
        const probability1 = ((countTrue1 / count) * 100).toFixed(2);
        const probability2 = ((countTrue2 / count) * 100).toFixed(2);

        setData({
          [`${dataType1}`]: countTrue1,
          [`${dataType2}`]: countTrue2,
        });

        setProbabilities({
          [`${dataType1}`]: probability1,
          [`${dataType2}`]: probability2,
        });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [dataType1, dataType2]);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [color1, color2],
      },
    ],
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Pie data={chartData} />
      <br />
      <div className="stadistics-media">
        <h2>Fuego:</h2>
        <h2>{probabilities[dataType2]}%</h2>
      </div>
      <h3>La probabilidad de que detecte fuego</h3><br />
      <div className="stadistics-media">
        <h2>Movimiento:</h2>
        <h2>{probabilities[dataType1]}%</h2>
      </div>
      <h3>La probabilidad de que detecte movimiento</h3><br />
    </div>
  );
};

export default PieChartTrueOnly;
