import React, { useEffect } from "react";
import StudentDashboardPage from "./student-dashboard";

const TVDashboard = () => {
  useEffect(() => {
    console.log("TVDashboard Mounted");

    // Force html and body to take full height and width
    document.documentElement.style.height = "100%";  // 100% height for html
    document.body.style.height = "100%";             // 100% height for body
    document.body.style.margin = "0";                // Remove any default margin
    document.body.style.padding = "0";               // Remove any default padding

    // Force the body element to occupy the full height of the viewport
    const body = document.querySelector('body');
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.style.justifyContent = 'center';
    body.style.alignItems = 'center';
  }, []);

  return (
    <div
      style={{
        width: "100vw",        // Full width of the viewport (viewport width)
        height: "100vh",       // Full height of the viewport (viewport height)
        margin: 0,            // No margin around the div
        padding: 0,           // No padding inside the div
        display: "flex",      // Use flexbox layout
        justifyContent: "center",  // Center content vertically
        alignItems: "center", // Center content horizontally
        backgroundColor: "white", // White background for the page
      }}
    >
      <StudentDashboardPage />
    </div>
  );
};

export default TVDashboard;
