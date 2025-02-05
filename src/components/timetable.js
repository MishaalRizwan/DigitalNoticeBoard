import React from "react";

const timetableData = {
  Monday: [
    { slot: "8:30 - 9:45", subject: "Foreign Language", room: "Room 215", teacher: "Mr. Adil Irshad" },
    { slot: "9:55 - 11:10", subject: "Compiler Construction", room: "Room 218", teacher: "Ms. Maria Hilal" },
    { slot: "11:20 - 12:35", subject: "Computer Graphics", room: "Room 220", teacher: "Dr. Junaid Tariq" },
    { slot: "12:45 - 2:00", subject: "SPM", room: "Room 216", teacher: "Ms. Humael Hussain" },
  ],
  Tuesday: [
    { slot: "8:30 - 9:45", subject: "Information Security", room: "Room 217", teacher: "Dr. Sajid Saleem" },
    { slot: "9:55 - 11:10", subject: "Computer Graphics (Lab)", room: "Lab 07", teacher: "Dr. Junaid Tariq" },
    { slot: "11:20 - 12:35", subject: "SPM", room: "Room 220", teacher: "Ms. Humael Hussain" },
    { slot: "12:45 - 2:00", subject: "Information Security", room: "Room 221", teacher: "Dr. Sajid Saleem" },
  ],
  // Add more days here...
};

const Timetable = () => {
  // Get the current day
  const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });

  // Get timetable for the current day
  const todayTimetable = timetableData[currentDay] || [];

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "28px", color: "#333" }}>
        {currentDay} - Timetable
      </h2>
      {todayTimetable.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "20px", // Large font for LED readability
          }}
        >
          <thead>
            <tr>
              <th style={headerStyle}>Slot</th>
              <th style={headerStyle}>Subject</th>
              <th style={headerStyle}>Room</th>
              <th style={headerStyle}>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {todayTimetable.map((entry, index) => (
              <tr key={index}>
                <td style={cellStyle}>{entry.slot}</td>
                <td style={cellStyle}>{entry.subject}</td>
                <td style={cellStyle}>{entry.room}</td>
                <td style={cellStyle}>{entry.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ fontSize: "20px", color: "#888" }}>No classes scheduled for today.</p>
      )}
    </div>
  );
};

const headerStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  backgroundColor: "#333",
  color: "#fff",
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};

export default Timetable;
