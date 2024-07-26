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

//const url = import.meta.env.VITE_SOCKET_URL;
const token = import.meta.env.VITE_SOCKET_TOKEN_URL;

const socket: Socket = io("https://ws.decasoft.xyz", {
  auth: {
    token: `${token}`,
  },
  transports: ["websocket"],
});

function Home() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [noise, setNoise] = useState<number | null>(null);
  const [movement, setMovement] = useState<boolean>(false);
  const [fire, setFire] = useState<boolean>(false);

  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    socket.on("IncomingData", (data: { message: string }) => {
      const parsedData: SensorData = JSON.parse(data.message);
      setSensorData(prevData => [...prevData, parsedData]);
      console.log("Datos recibidos:", parsedData);
      
      parsedData.sensors.forEach(sensor => {
        switch(sensor.dataType) {
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
            if(sensor.data as boolean === true){
              getAlertMovement();
            }
            break;
          case 'fuego':
            setFire(sensor.data as boolean);
            if(sensor.data as boolean === true){
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
    };
  }, []);

  const getAlertMovement = () => {
    // Lógica para manejar alertas de movimiento
  }

  const getAlertFire = () => {
    // Lógica para manejar alertas de fuego
  }

  return (
    <div className="maindiv">
      <Menu />
      <div className="sub-maindiv">
        <Fade>
          <Header />
          <div className="home-section">
            <section className="home-section-metrics">
              <h1>Métricas</h1>
              <br />
              <ul>
                <li className="home-temperatura">
                  <img
                    src="/assets/svg/termometro.svg"
                    alt="Icono de temperatura"
                    style={{ width: "15%" }}
                  />
                  <h2>Temperatura</h2>
                  <h2>{temperature !== null ? `${temperature}°C` : "N/A"}</h2>
                </li>
                <li className="home-humedad">
                  <img
                    src="/assets/svg/humedad.svg"
                    alt="Icono de humedad"
                    style={{ width: "15%" }}
                  />
                  <h2>Humedad</h2>
                  <h2>{humidity !== null ? `${humidity}%` : "N/A"}</h2>
                </li>
                <li className="home-ruido">
                  <img
                    src="/assets/svg/sonido.svg"
                    alt="Icono de sonido"
                    style={{ width: "15%" }}
                  />
                  <h2>Ruido</h2>
                  <h2>{noise !== null ? noise : "0"}</h2>
                </li>
              </ul>
              <br />
              <br />
              <section className="home-section-metrics2">
                <ul>
                  <li className={`${movement ? "home-movimiento" : ""}`}>
                    <h1>Movimiento</h1>
                    <img
                      src="/assets/svg/correr.svg"
                      alt="Icono de movimiento"
                      style={{ width: "15%" }}
                    />
                  </li>
                  <li className={`${fire ? "home-fuego" : ""}`}>
                    <h1>Fuego</h1>
                    <img
                      src="/assets/svg/fuego.svg"
                      alt="Icono de fuego"
                      style={{ width: "15%" }}
                    />
                  </li>
                </ul>
              </section>
            </section>
            <br />
            <br />
            <section className="home-section-grafic">
              <h1>Gráfica</h1>
              <br />
              <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                <div className="graficas">
                  <MyChart sensorData={sensorData} />
                </div>
              </div>
            </section>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Home;
