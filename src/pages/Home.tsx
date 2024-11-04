import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { Fade } from "react-awesome-reveal";
import Menu from "../components/Menu";
import Header from "../components/Header";
import "../styles/Home.css";
import "../styles/maindiv.css";
import MyChart from "../components/MyChart";

// Tipo para la estructura de los datos recibidos
interface SensorData {
  userId: number;
  sensors: {
    sensorId: number;
    dataType: string;
    data: number | boolean;
    location: string;
  }[];
}

const Home = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [noise, setNoise] = useState<number | null>(null);
  const [movement, setMovement] = useState<boolean>(false);
  const [fire, setFire] = useState<boolean>(false);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const url = import.meta.env.VITE_SOCKET_URL;
    const socket: Socket = io(url, {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("IncomingData", (data: { message: string }) => {
      const parsedData: SensorData = JSON.parse(data.message);
      setSensorData(prevData => [...prevData, parsedData]);
      console.log("Datos recibidos:", parsedData);

      parsedData.sensors.forEach(sensor => {
        switch (sensor.dataType) {
          case 'temperatura':
            setTemperature(sensor.data as number);
            break;
          case 'humedad':
            setHumidity(sensor.data as number);
            break;
          case 'sonido':
            setNoise(sensor.data as number);
            break;
          case 'movimiento':
            setMovement(sensor.data as boolean);
            if (sensor.data as boolean) {
              getAlertMovement();
            }
            break;
          case 'fuego':
            setFire(sensor.data as boolean);
            if (sensor.data as boolean) {
              getAlertFire();
            }
            break;
          default:
            break;
        }
      });
    });

    return () => {
      socket.off("IncomingData");
      socket.disconnect();
    };
  }, []);

  const getAlertMovement = () => {
    // Lógica para manejar alertas de movimiento
  };

  const getAlertFire = () => {
    // Lógica para manejar alertas de fuego
  };

  return (
    <div className="maindiv">
      <Menu />
      <div className="sub-maindiv">
        <Fade>
          <Header />
          <div className="home-section">
            {/* Resto del contenido */}
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Home;
