import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; // Importar el plugin de lista
import axios from 'axios';

interface SensorData {
  id: number;
  sensor_id: number;
  data_type: string;
  data: string;
  createdAt: string;
}

interface FullCalendarEventsProps {
  dataType1: string; // "movimiento"
  dataType2: string; // "fuego"
  color1: string;
  color2: string;
}

interface CalendarEvent {
  title: string;
  start: string;
  backgroundColor: string;
  borderColor: string;
}

const FullCalendarEvents: React.FC<FullCalendarEventsProps> = ({ dataType1, dataType2, color1, color2 }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get<SensorData[]>(`http://localhost:3000/sensor-data/${dataType1}`);
        const response2 = await axios.get<SensorData[]>(`http://localhost:3000/sensor-data/${dataType2}`);
        
        const data1 = response1.data.filter(item => item.data === 'true');
        const data2 = response2.data.filter(item => item.data === 'true');

        const events1 = data1.map<CalendarEvent>(item => ({
          title: dataType1,
          start: item.createdAt,
          backgroundColor: color1,
          borderColor: color1
        }));

        const events2 = data2.map<CalendarEvent>(item => ({
          title: dataType2,
          start: item.createdAt,
          backgroundColor: color2,
          borderColor: color2
        }));

        setEvents([...events1, ...events2]);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [dataType1, dataType2]);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]} // Añadir listPlugin
        initialView="listMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth' // Añadir la opción de vista de lista
        }}
        events={events}
        height="auto"
      />
    </div>
  );
};

export default FullCalendarEvents;
