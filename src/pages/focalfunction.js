import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../components/nav-bar"; // Import the Navbar component
import CalendarPage from '../components/calendarpage'; // Import the CalendarPage component
import "../components/background.css"; // Import background styles
import "../components/sidebar.css"; // Import the sidebar CSS
import DashboardPage from './Dashboard'; // Import the DashboardPage component
import { isFocalPerson } from "../Utils/Auth"; // Make sure the path is correct
import FocalSettingPage from "../components/focal_setting";

const FocalFunction = () => {
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState("DashboardPage"); // Set default active content to DashboardPage

  // Check if the user is authenticated
  useEffect(() => {
    if (!isFocalPerson()) {
      navigate("/focal-login"); // Redirect to focal login if not authenticated
    }
  }, [navigate]);

  // Function to set active content based on button click
  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  // Function to determine the button style based on active content
  const getButtonStyle = (content) => ({
    textDecoration: "none",
    color: activeContent === content ? "#007bff" : "#000", // Change color if active
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: activeContent === content ? "bold" : "normal", // Bold if active
  });

  return (
    <div className="user"> {/* Background class */}
      <Navbar userType="focal" /> {/* Pass 'focal' as the userType prop */}
      
      <div className="page-layout" style={{ display: "flex", height: "100vh" }}> {/* Flex layout for sidebar and content */}
        <aside className="sidebar" style={{ 
          backgroundColor: "#f8f9fa", 
          width: "200px", 
          padding: "20px", 
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          zIndex: 1000 // Ensure sidebar is on top
        }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "15px" }}>
              <button 
                onClick={() => handleContentChange("DashboardPage")}
                style={getButtonStyle("DashboardPage")}
              >
                Dashboard
              </button>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <button 
                onClick={() => handleContentChange("calendar")}
                style={getButtonStyle("calendar")}
              >
                Calendar
              </button>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <button 
                onClick={() => handleContentChange("settings")}
                style={getButtonStyle("settings")}
              >
                Settings
              </button>
            </li>
          </ul>
        </aside>

        <section className="content" style={{ 
          flex: 1, 
          padding: "20px", 
          backgroundColor: "#ffffff",
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)", // Add some shadow for depth
          zIndex: 1
        }}>
          {/* Conditional rendering based on active content */}
          {activeContent === "DashboardPage" && <DashboardPage />} {/* Render DashboardPage when "Dashboard" button is clicked */}
          {activeContent === "calendar" && <CalendarPage />} {/* Render CalendarPage when "Calendar" button is clicked */}
          {activeContent === "settings" && <FocalSettingPage/>}
        </section>
      </div>
    </div>
  );
};

export default FocalFunction;
