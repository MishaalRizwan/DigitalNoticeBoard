import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import ImageSorter from '../components/ImageSorter'; // Import the ImageSorter component

function DashboardPage() {
  const [time, setTime] = useState(moment().format('LTS'));
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track if the ticker is being edited
  const [tickerText, setTickerText] = useState(''); // Store the ticker text
  const [events, setEvents] = useState([]); // Store events from localStorage

  const API_KEY = '664e974206f7b780fd74b69f9b6751b3'; // Replace with your OpenWeatherMap API key
  const location = 'Rawalpindi';

  // Timetable data
  const timetable = {
    Monday: [
      { slot: "Slot 1", time: "8:30 - 9:45", subject: "SPM", room: "Room 218" },
      { slot: "Slot 2", time: "9:55 - 11:10", subject: "Computer Graphics", room: "Lab 04" },
      { slot: "Slot 3", time: "11:20 - 12:35", subject: "Foreign Language", room: "Room 215" },
      { slot: "Slot 4", time: "12:35 - 2:00", subject: "Foreign Language", room: "Room 215" },
    ],
    Tuesday: [
      { slot: "Slot 1", time: "8:30 - 9:45", subject: "Web Technology", room: "Room 210" },
      { slot: "Slot 2", time: "9:55 - 11:10", subject: "Web Technology", room: "Room 220" },
      { slot: "Slot 3", time: "11:20 - 12:35", subject: "SPM", room: "Room 230" },
      { slot: "Slot 4", time: "12:35 - 2:00", subject: "Visual Prog", room: "Room 230" },
    ],
    Wednesday: [
      { slot: "Slot 1", time: "8:30 - 9:45", subject: "Visual Prog", room: "Room 210" },
      { slot: "Slot 2", time: "9:55 - 11:10", subject: "English", room: "Room 220" },
      { slot: "Slot 3", time: "11:20 - 12:35", subject: "Automata", room: "Room 230" },
      { slot: "Slot 3", time: "12:35 - 2:00", subject: "Automata", room: "Room 230" },
    ],
    Thursday: [
      { slot: "Slot 1", time: "8:30 - 9:45", subject: "MVC", room: "Room 210" },
      { slot: "Slot 2", time: "9:55 - 11:10", subject: "MVC", room: "Room 210" },
      { slot: "Slot 3", time: "11:20 - 12:35", subject: "Visual Lab", room: "lab 9" },
      { slot: "Slot 3", time: "12:35 - 2:00", subject: "Visual Lab", room: "lab 9" },
    ],
    Friday: [
      { slot: "Slot 1", time: "8:30 - 9:45", subject: "Maths", room: "Room 210" },
      { slot: "Slot 2", time: "9:55 - 11:10", subject: "English", room: "Room 220" },
      { slot: "Slot 3", time: "11:20 - 12:35", subject: "Physics", room: "Room 230" },
    ],
  };

  // Fetch weather data
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

    // Load ticker text from local storage when the component mounts
    const storedTickerText = localStorage.getItem('tickerText');
    if (storedTickerText) {
      setTickerText(storedTickerText);
    }
    // Load events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('myEvents')) || [];
    setEvents(storedEvents);

    return () => clearInterval(timer);
  }, [location]);

  // Handle focus and blur events for the ticker
  const handleFocus = () => {
    setIsEditing(true); // Stop the ticker when editing
  };

  const handleBlur = () => {
    setIsEditing(false); // Resume the ticker when done editing
    // Save the edited ticker text to local storage
    localStorage.setItem('tickerText', tickerText);
  };
  
  const handleTickerTextChange = (event) => {
    const newText = event.target.innerText;
    setTickerText(newText);
    localStorage.setItem('tickerText', newText);
  };
 
  // Fetch a random quote
  useEffect(() => {
    fetch('/api/random')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setQuote(data[0].q);  // Use 'q' for quote
          setAuthor(data[0].a);  // Use 'a' for author
        }
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
      });
  }, []);

  const getCurrentDayTimetable = () => {
    const currentDay = moment().format('dddd');
    if (currentDay === 'Saturday' || currentDay === 'Sunday') {
      return timetable.Monday; // Show Monday's timetable on weekends
    }
    return timetable[currentDay] || [];
  };
  
  const renderTimetable = () => {
    const dayTimetable = getCurrentDayTimetable();
    const currentDay = moment().format('dddd');
  
    return (
      <div
        className="timetable-container"
        style={{
          width: '100%', // Ensure the container fills the width of the parent
          height: '330px', // Full height of the viewport to avoid scrolling
          padding: '5px',
          border: '1px solid #ddd',
          boxSizing: 'border-box', // Includes padding and border in the width/height calculation
          display: 'flex',
          flexDirection: 'column', // Arrange the title and table vertically
        }}
      >
        {/* Dynamic Title based on the current day */}
        <h2 style={{ textAlign: 'center', color: '#007bff' , fontSize:'17px'}}>
          {`Timetable for ${currentDay}`}
        </h2>
  
        <div
          className="timetable-table-wrapper"
          style={{
            overflowX: 'hidden', // Prevent horizontal scrolling
            overflowY: 'auto', // Allow vertical scrolling if needed
            height: 'calc(100vh - 40px)', // Adjusting height to allow room for the title
            marginTop: '10px',
          }}
        >
          <table
            className="timetable-table"
            style={{
              width: '100%', // Ensures the table fills the width of the container
              height: '60%', // Ensures the table fills the height of the container
              borderCollapse: 'collapse',
              fontSize: '14px',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            <thead>
              <tr
                className="timetable-header"
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                }}
              >
                <th
                  className="timetable-cell"
                  style={{
                    padding: '8px',
                    borderLeft: '2px solid #007bff',
                  }}
                >
                  Time
                </th>
                <th
                  className="timetable-cell"
                  style={{
                    padding: '8px',
                    borderLeft: '2px solid #007bff',
                  }}
                >
                  Room
                </th>
                <th
                  className="timetable-cell timetable-cell-right"
                  style={{
                    padding: '7px',
                    borderRight: '1px solid #007bff',
                  }}
                >
                  Subject
                </th>
              </tr>
            </thead>
            <tbody>
              {dayTimetable.map((slot, index) => (
                <tr
                  key={index}
                  className="timetable-row"
                  style={{
                    backgroundColor: '#e2f1ff',
                    cursor: 'pointer',
                  }}
                >
                  <td
                    className="timetable-cell"
                    style={{
                      padding: '7px',
                      borderLeft: '2px solid #007bff',
                    }}
                  >
                    {slot.time}
                  </td>
                  <td
                    className="timetable-cell"
                    style={{
                      padding: '7px',
                      borderLeft: '2px solid #007bff',
                    }}
                  >
                    {slot.room}
                  </td>
                  <td
                    className="timetable-cell timetable-cell-right"
                    style={{
                      padding: '7px',
                      borderRight: '2px solid #007bff',
                    }}
                  >
                    {slot.subject}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      );
      }

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
          <div style={{ marginBottom: '1px', backgroundColor: '#ffffff', padding: '10px', borderRadius: '3px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            {renderTimetable()}
          </div>
          {/* Quote Display */}
          <div
            style={{
              marginBottom: '15px',
              backgroundColor: '#e0e0e0',
              padding: '10px',
              cursor: 'pointer',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            <p>{quote || "Loading quote..."}</p> {/* Display the fetched quote */}
            {author && <p style={{ fontStyle: 'italic', marginTop: '10px' }}>- {author}</p>} {/* Display author */}
          </div>
        </div>

 {/* Main Dashboard Flyers (Center Content) */}
 <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '10px' }}>
          <ImageSorter events={events} /> {/* Pass events to ImageSorter component */}
        </div>
      </div>

      {/* Bottom News Ticker */}
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
              contentEditable
              onFocus={handleFocus}
              onBlur={handleBlur}
              suppressContentEditableWarning={true}
              onInput={handleTickerTextChange}
              style={{
                display: 'inline-block',
                animation: isEditing ? 'none' : 'scrollNotice 10s linear infinite',
                fontWeight: 'bold',
                fontSize: '20px',
                cursor: 'text',
              }}
            >
              {tickerText || "Enter your ticker text here"}
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
