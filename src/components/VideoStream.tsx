import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://192.168.1.68:5000');

function App() {
  const [frame, setFrame] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('video_frame', (data) => {
      setFrame(`data:image/jpeg;base64,${data.frame}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Real-time Camera Feed</h1>
      {frame && <img src={frame} alt="Camera Feed" style={{ width: '640px', height: '480px' }} />}
    </div>
  );
}

export default App;
