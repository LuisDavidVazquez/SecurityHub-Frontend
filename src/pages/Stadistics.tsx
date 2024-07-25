import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { Fade } from "react-awesome-reveal";
import Menu from "../components/Menu";
import Header from "../components/Header";
import "../styles/maindiv.css";
import "../styles/Stadistics.css";
import MyChartUnique from "../components/MyChartUnique";

interface SensorData {
  userId: number;
  sensors: {
    sensorId: number;
    dataType: string;
    data: number | boolean;
    location: string;
  }[];
}

const url = import.meta.env.VITE_SOCKET_URL as string;
const token = import.meta.env.VITE_SOCKET_TOKEN_URL as string;

const socket: Socket = io(`${url}`, {
  auth: {
    token: `${token}`,
  },
  transports: ["websocket"],
});

function Stadistics() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    socket.on("IncomingData", (data: { message: string }) => {
      const parsedData: SensorData = JSON.parse(data.message);
      setSensorData((prevData) => {
        // Verifica si ya existe el usuario en prevData
        const existingUserIndex = prevData.findIndex((item) => item.userId === parsedData.userId);
        
        if (existingUserIndex !== -1) {
          // Si existe, actualiza sus datos de sensores
          const updatedData = [...prevData];
          updatedData[existingUserIndex] = parsedData;
          return updatedData;
        } else {
          // Si no existe, agrega un nuevo usuario con sus datos de sensores
          return [...prevData, parsedData];
        }
      });
      console.log("Datos recibidos:", parsedData);
    });

    return () => {
      socket.off("IncomingData");
    };
  }, []);

  return (
    <div className="maindiv">
      <Menu />
      <div className="sub-maindiv">
        <Fade>
          <Header />
          <div className="stadistics-section">
            <section className="stadistics-section-1">
              <h1>Gráficas en tiempo real</h1>
              <br />
              <ul>
                <li>
                  <div className='stadistics-grafic'>
                    <MyChartUnique sensorData={sensorData} dataType="temperatura" color="rgba(255, 99, 132, 1)" />
                  </div>
                </li>
                <li>
                  <div className='stadistics-grafic'>
                    <MyChartUnique sensorData={sensorData} dataType="humedad" color="rgba(54, 162, 235, 1)" />
                  </div>
                </li>
                <li>
                  <div className='stadistics-grafic'>
                    <MyChartUnique sensorData={sensorData} dataType="sonido" color="rgba(75, 192, 192, 1)" />
                  </div>
                </li>
              </ul>
            </section>
            <br /><br />
            <section className="stadistics-section-1">
              <h1>Historial de métricas</h1>
              <br />
              <ul>
                <li>
                  <div className='stadistics-grafic'>
                    {/* Añadir componente de gráficos históricos aquí */}
                  </div>
                </li>
                <li>
                  <div className='stadistics-grafic'>
                    {/* Añadir componente de gráficos históricos aquí */}
                  </div>
                </li>
                <li>
                  <div className='stadistics-grafic'>
                    {/* Añadir componente de gráficos históricos aquí */}
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Stadistics;
