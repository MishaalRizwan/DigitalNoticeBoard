import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';

function DashboardPage() {
  const [time, setTime] = useState(moment().format('LTS'));
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("quote of the day");
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef(null);

  const API_KEY = '664e974206f7b780fd74b69f9b6751b3'; // Replace with your OpenWeatherMap API key
  const location = 'Rawalpindi';
  // Timetable data
  const timetable = {
    Sunday: [
      { slot: "Slot 1", time: "8:30 - 9:45", subject: "SPM", room: "Room 218" },
      { slot: "Slot 2", time: "9:55 - 11:10", subject: "Computer Graphics", room: "Lab 04" },
      { slot: "Slot 3", time: "11:20 - 12:35", subject: "Foreign Language", room: "Room 215" },
      { slot: "Slot 4", time: "12:35 - 2:00", subject: "Foreign Language", room: "Room 215" },
    ],
    Tuesday: [
      { slot: "Slot 1", time: "8:30 - 9:45", subject: "Maths", room: "Room 210" },
      { slot: "Slot 2", time: "9:55 - 11:10", subject: "English", room: "Room 220" },
      { slot: "Slot 3", time: "11:20 - 12:35", subject: "Physics", room: "Room 230" },
      { slot: "Slot 3", time: "12:35 - 2:00", subject: "Physics", room: "Room 230" },
    ],
    Wednesday: [
        { slot: "Slot 1", time: "8:30 - 9:45", subject: "Maths", room: "Room 210" },
        { slot: "Slot 2", time: "9:55 - 11:10", subject: "English", room: "Room 220" },
        { slot: "Slot 3", time: "11:20 - 12:35", subject: "Physics", room: "Room 230" },
        { slot: "Slot 3", time: "12:35 - 2:00", subject: "Physics", room: "Room 230" },
    ],
    Thursday: [
        { slot: "Slot 1", time: "8:30 - 9:45", subject: "Maths", room: "Room 210" },
        { slot: "Slot 2", time: "9:55 - 11:10", subject: "English", room: "Room 220" },
        { slot: "Slot 3", time: "11:20 - 12:35", subject: "Physics", room: "Room 230" },
        { slot: "Slot 3", time: "12:35 - 2:00", subject: "Physics", room: "Room 230" },
    ],
    Friday: [
      { slot: "Slot 1", time: "8:30 - 9:45", subject: "Maths", room: "Room 210" },
      { slot: "Slot 2", time: "9:55 - 11:10", subject: "English", room: "Room 220" },
      { slot: "Slot 3", time: "11:20 - 12:35", subject: "Physics", room: "Room 230" },
    ],
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchWeather();

    const timer = setInterval(() => {
      setTime(moment().format('LTS'));
    }, 1000);

    return () => clearInterval(timer);
  }, [location]);

  useEffect(() => {
    const storedQuote = localStorage.getItem('quote');
    const storedTime = localStorage.getItem('quoteTimestamp');

    if (storedQuote && storedTime) {
      const currentTime = Date.now();
      const timeDiff = currentTime - Number(storedTime);

      if (timeDiff < 12 * 60 * 60 * 1000) {
        setQuote(storedQuote);
      }
    }
  }, []);

  const getCurrentDayTimetable = () => {
     const currentDay = moment().format('dddd'); // Get current day (e.g., Monday, Tuesday)
     return timetable[currentDay] || [];
   };
 
   const renderTimetable = () => {
     const dayTimetable = getCurrentDayTimetable();
     const currentTime = moment().format('HH:mm'); // Current time in 24-hour format
 
     return (
       <table style={{ width: '30px', borderCollapse: 'collapse', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
         <thead>
           <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
             <th style={{ padding: '12px', textAlign: 'left', borderRadius: '6px 0 0 0' }}>Time</th>
             <th style={{ padding: '12px', textAlign: 'left' }}>Room</th>
             <th style={{ padding: '12px', textAlign: 'left', borderRadius: '0 6px 0 0' }}>Subject</th>
           </tr>
         </thead>
         <tbody>
           {dayTimetable.map((slot, index) => (
             <tr
               key={index}
               style={{
                 backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#ffffff',
                 borderBottom: '2px solid #ddd',
                 transition: 'background-color 0.3s ease',
               }}
               onMouseEnter={(e) => (e.target.style.backgroundColor = '#e2f1ff')}
               onMouseLeave={(e) => (e.target.style.backgroundColor = index % 2 === 0 ? '#f7f7f7' : '#ffffff')}
             >
               <td style={{ padding: '8px', borderLeft: '2px solid #007bff' }}>{slot.time}</td>
               <td style={{ padding: '8px' }}>{slot.room}</td>
               <td style={{ padding: '8px', borderRight: '2px solid #007bff' }}>{slot.subject}</td>
             </tr>
           ))}
         </tbody>
       </table>
     );
   };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Top Navbar */}
      <div style={{ backgroundColor: '#00b7ff', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="./image-1@2x.png"
            alt="NUML Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          <h2 style={{ margin: 0, fontSize: '20px' }}>NUML</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0 }}>{time}</p>
          <p style={{ margin: 0 }}>{moment().format('DD/MM/YYYY')}</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexGrow: 1, padding: '10px' }}>
        {/* Left Sidebar */}
        <div style={{ width: '240px', backgroundColor: '#f5f5f5', padding: '15px' }}>
          <div style={{ marginBottom: '15px', backgroundColor: '#ffffff', padding: '15px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ margin: 0, marginBottom: '10px', fontSize: '16px', color: '#333' }}>Monday Timetable</h3>
            {renderTimetable()}
          </div>
          <div
            style={{
              marginBottom: '15px',
              backgroundColor: '#e0e0e0',
              padding: '10px',
              cursor: 'pointer',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => textAreaRef.current?.focus(), 0);
            }}
          >
            {isEditing ? (
              <textarea
                ref={textAreaRef}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                onBlur={() => {
                  setIsEditing(false);
                  localStorage.setItem('quote', quote);
                  localStorage.setItem('quoteTimestamp', Date.now());
                }}
                style={{ width: '100%', border: 'none', outline: 'none', resize: 'none' }}
              />
            ) : (
              <p>{quote}</p>
            )}
          </div>
        </div>

        {/* Center Content (Main Dashboard Boxes) */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              overflow: 'hidden',
              margin: '10px',
              width: '100%',
              flexGrow: 1,  // Allow this box to take up available space
              height: '100%', // Ensure it takes full height of the container
              boxSizing: 'border-box',
              border: '2px solid black',
              backgroundImage: 'url("/sample flyer 6.jpg")', // Add image here
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          </div>
        </div>

        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              overflow: 'hidden',
              margin: '10px',
              width: '100%',
              flexGrow: 1,  // Allow this box to take up available space
              height: '100%', // Ensure it takes full height of the container
              boxSizing: 'border-box',
              border: '2px solid black',
              backgroundImage: 'url("/sample flyer 5.jpg")', // Add image here
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          </div>
        </div>

        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              overflow: 'hidden',
              margin: '10px',
              width: '100%',
              flexGrow: 1,  // Allow this box to take up available space
              height: '100%', // Ensure it takes full height of the container
              boxSizing: 'border-box',
              border: '2px solid black',
              backgroundImage: 'url("/sample flyer 3.png")', // Add image here
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}>
          </div>

          <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              overflow: 'hidden',
              margin: '10px',
              width: '100%',
              flexGrow: 1,  // Allow this box to take up available space
              height: '100%', // Ensure it takes full height of the container
              boxSizing: 'border-box',
              border: '2px solid black',
              backgroundImage: 'url("/sample flyer 4.jpg")', // Add image here
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
          </div>
        </div>
      </div>

      {/* Bottom News Ticker with Weather */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#00b7ff', color: 'white', height: '40px', padding: '0 10px' }}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <div>
            {loading ? "Loading weather..." : weatherData ? `${weatherData?.name}: ${weatherData?.main.temp}°C` : "Weather data unavailable"}
          </div>

          <div
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: 'calc(100% - 150px)',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                animation: 'scrollNotice 20s linear infinite',
                fontWeight: 'bold',
                fontSize:'20px',
              }}
            >
              Important Notice: Midterm exams will start on Monday. Please check your schedules!
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scrollNotice {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
}

export default DashboardPage;
