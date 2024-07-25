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

const url = import.meta.env.VITE_SOCKET_URL as string;
const token = import.meta.env.VITE_SOCKET_TOKEN_URL as string;

const socket: Socket = io(`${url}`, {
  auth: {
    token: `${token}`,
  },
  transports: ["websocket"],
});

const cameraSocket: Socket = io("http://192.168.43.246:5000", {
  transports: ["websocket"],
});

const Cameras: React.FC = () => {

  const [movement, setMovement] = useState<boolean>(false);
  const [fire, setFire] = useState<boolean>(false);
  const [videoFrame, setVideoFrame] = useState<string>('');
  const videoRef = useRef<HTMLImageElement>(null);
  const [buttonStart, getButtonStart] = useState(true)
  const [buttonStop, getButtonStop] = useState(false)


  useEffect(() => {
    socket.on('IncomingData', (data: { message: string }) => {
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
      socket.off('IncomingData');
    };
  }, []);

  
  useEffect(() => {
    cameraSocket.on('video_frame', (data: { frame: string }) => {
      setVideoFrame(`data:image/jpeg;base64,${data.frame}`);
    });

    return () => {
      cameraSocket.off('video_frame');
    };
  }, []);



  const takePhoto = async () => {

    const response = await fetch(`http://192.168.43.246:5000/take_photo`, { method: 'POST' });
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
  };

  const startRecording = async () => {
    getButtonStart(false)
    getButtonStop(true)
    await fetch(`http://192.168.43.246:5000/start_recording`, { method: 'POST' });
  };

  const stopRecording = async () => {
    getButtonStart(true)
    getButtonStop(false)
    await fetch(`http://192.168.43.246:5000/stop_recording`, { method: 'POST' });
    Swal.fire({
      title: "Video guardado",
      icon: "success",
      showConfirmButton: false,
    });
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
                    <div style={{width:'100%', height:"40vh", display:'flex', justifyContent:"center", alignItems:"center",color:'white'}}>
                      <h1 style={{fontSize:"40px"}}>Cámara no disponibles</h1>
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
