import React, { useEffect, useState, useRef } from 'react';
import Menu from '../components/Menu';
import Header from '../components/Header';
import { Fade } from 'react-awesome-reveal';
import "../styles/maindiv.css";
import "../styles/Cameras.css";
import { io, Socket } from "socket.io-client";
import Swal from 'sweetalert2';

interface SensorData {
  userId: number;
  sensors: {
    sensorId: number;
    dataType: string;
    data: number | boolean;
    location: string;
  }[];
}

const Cameras: React.FC = () => {
  const [movement, setMovement] = useState<boolean>(false);
  const [fire, setFire] = useState<boolean>(false);
  const [videoFrame, setVideoFrame] = useState<string>('');
  const videoRef = useRef<HTMLImageElement>(null);
  const [buttonStart, getButtonStart] = useState(true);
  const [buttonStop, getButtonStop] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const url = import.meta.env.VITE_SOCKET_URL as string;
    const mainSocket: Socket = io(url, {
      auth: { token },
      transports: ["websocket"],
    });

    mainSocket.on('IncomingData', (data: { message: string }) => {
      const parsedData: SensorData = JSON.parse(data.message);
      parsedData.sensors.forEach(sensor => {
        if (sensor.dataType === 'movimiento') {
          setMovement(sensor.data as boolean);
        } else if (sensor.dataType === 'fuego') {
          setFire(sensor.data as boolean);
        }
      });
    });

    return () => {
      mainSocket.off('IncomingData');
      mainSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const cameraSocket: Socket = io("https://old-rules-battle.loca.lt", {
      transports: ["websocket"],
    });

    cameraSocket.on('video_frame', (data: { frame: string }) => {
      setVideoFrame(`data:image/jpeg;base64,${data.frame}`);
    });

    return () => {
      cameraSocket.off('video_frame');
      cameraSocket.disconnect();
    };
  }, []);

  const takePhoto = async () => {
    try {
      const response = await fetch(`https://old-rules-battle.loca.lt/take_photo`, { method: 'POST' });
      if (!response.ok) throw new Error('Error al tomar la foto');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'photo.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      Swal.fire({
        title: "Foto guardada",
        icon: "success",
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error al tomar la foto",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  const startRecording = async () => {
    try {
      getButtonStart(false);
      getButtonStop(true);
      const response = await fetch(`https://old-rules-battle.loca.lt/start_recording`, { method: 'POST' });
      if (!response.ok) throw new Error('Error al iniciar la grabación');
      Swal.fire({
        title: "Grabación iniciada",
        icon: "success",
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error al iniciar la grabación",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  const stopRecording = async () => {
    try {
      getButtonStart(true);
      getButtonStop(false);
      const response = await fetch(`https://old-rules-battle.loca.lt/stop_recording`, { method: 'POST' });
      if (!response.ok) throw new Error('Error al detener la grabación');
      Swal.fire({
        title: "Grabación detenida y video guardado",
        icon: "success",
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error al detener la grabación",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="maindiv">
      <Menu />
      <div className="sub-maindiv">
        <Fade>
          <Header />
          <div className="camera-section">
            <section className="camera-section-metrics2">
              <ul>
                <li className={`${movement ? "home-movimiento" : ""}`}>
                  <h1>Movimiento</h1>
                  <img
                    src="/assets/svg/correr.svg"
                    alt="Icono de movimiento"
                    style={{ width: "10%" }}
                  />
                </li>
                <li className={`${fire ? "home-fuego" : ""}`}>
                  <h1>Fuego</h1>
                  <img
                    src="/assets/svg/fuego.svg"
                    alt="Icono de fuego"
                    style={{ width: "10%" }}
                  />
                </li>
              </ul>
            </section>
            <section className="camera-section">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="camera-section-1-videocam">
                  {!videoFrame && (
                    <div style={{ width: '100%', height: "40vh", display: 'flex', justifyContent: "center", alignItems: "center", color: 'white' }}>
                      <h1 style={{ fontSize: "40px" }}>Cámara no disponible</h1>
                    </div>
                  )}
                  {videoFrame && (
                    <img
                      src={videoFrame}
                      alt="Video Stream"
                      ref={videoRef}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>
              </div><br />
              <ul>
                <li>
                  <button onClick={takePhoto}>
                    Foto
                    <img
                      src="/assets/svg/camara.svg"
                      alt="Icono de cámara"
                      style={{ width: "15%" }}
                    />
                  </button>
                </li>
                {buttonStart && (
                  <li>
                    <button onClick={startRecording}>
                      Grabar
                      <img
                        src="/assets/svg/camara-de-pelicula.svg"
                        alt="Icono de cámara de película"
                        style={{ width: "15%" }}
                      />
                    </button>
                  </li>
                )}
                {buttonStop && (
                  <li>
                    <button onClick={stopRecording}>
                      Detener
                      <img
                        src="/assets/svg/detener.svg"
                        alt="Icono de detener"
                        style={{ width: "15%" }}
                      />
                    </button>
                  </li>
                )}
              </ul>
            </section>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Cameras;
