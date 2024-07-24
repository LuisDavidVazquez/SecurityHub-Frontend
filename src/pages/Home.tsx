import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { Fade } from "react-awesome-reveal";
import Menu from "../components/Menu";
import Header from "../components/Header";
import "../styles/Home.css";
import "../styles/maindiv.css";

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

const socket: Socket = io("http://localhost:5555",{
  auth: {
    token: "wintersito",
  },
  transports: ["websocket"],
});

function Home() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [noise, setNoise] = useState<number | null>(null);
  const [movement, setMovement] = useState<boolean>(false);
  const [fire, setFire] = useState<boolean>(false);

  useEffect(() => {
    socket.on("IncomingData", (data: { message: string }) => {
      const parsedData: SensorData = JSON.parse(data.message);
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
            if (sensor.data === 1) {
              const randomNoise = Math.floor(Math.random() * 5) + 1;
              setNoise(randomNoise);
            } else {
              setNoise(null);
            }
            break;
          case 'movimiento':
            setMovement(sensor.data as boolean);
            break;
          case 'fuego':
            setFire(sensor.data as boolean);
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
                  <h2>{temperature !== null ? `${temperature}°C` : 'N/A'}</h2>
                </li>
                <li className="home-humedad">
                  <img
                    src="/assets/svg/humedad.svg"
                    alt="Icono de humedad"
                    style={{ width: "15%" }}
                  />
                  <h2>Humedad</h2>
                  <h2>{humidity !== null ? `${humidity}%` : 'N/A'}</h2>
                </li>
                <li className="home-ruido">
                  <img
                    src="/assets/svg/sonido.svg"
                    alt="Icono de sonido"
                    style={{ width: "15%" }}
                  />
                  <h2>Ruido</h2>
                  <h2>{noise !== null ? noise : 'N/A'}</h2>
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
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Home;
