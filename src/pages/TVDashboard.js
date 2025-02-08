import React, { useEffect } from "react";
import DashboardPage from "./Dashboard";

const TVDashboard = () => {
  useEffect(() => {
    console.log("TVDashboard Mounted");
  }, []);

  return (
    <div
      style={{
        width: "100vw",  // 100% of viewport width
        height: "100vh", // 100% of viewport height
        margin: 0,       // Remove any margins
        padding: 0,      // Remove any padding
        display: "flex", // Use flexbox layout
        background: "White", // Optional: to make the background black for TV
        color: "Black",  // Ensure the text is visible
      }}
    >
      <DashboardPage />
    </div>
  );
};

export default TVDashboard;
