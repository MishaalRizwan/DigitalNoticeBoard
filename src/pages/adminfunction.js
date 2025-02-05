import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav-bar"; // Import Navbar component
import CalendarPage from '../components/calendarpage'; // Import Calendar component
import "../components/background.css"; // Background styles
import "../components/sidebar.css"; // Sidebar styles
import DashboardPage from './Dashboard'; // Import Dashboard component
import { isAdmin } from "../Utils/Auth"; // Authentication utility
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import SettingPage from "../components/setting";

const AdminFunction = () => {
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState("DashboardPage");
  const [userInfo, setUserInfo] = useState(null);

  // Check if the user is authenticated as admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/admin-login");
    } else {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken); // Assuming token has user info
    }
  }, [navigate]);

  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  const getButtonStyle = (content) => ({
    textDecoration: "none",
    color: activeContent === content ? "#007bff" : "#000",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: activeContent === content ? "bold" : "normal",
  });

  return (
    <div className="user">
      {/* Pass userInfo as a prop to the Navbar */}
      <Navbar userType="admin" userInfo={userInfo} />

      <div className="page-layout" style={{ display: "flex", height: "100vh" }}>
        <aside className="sidebar" style={{ 
          backgroundColor: "#f8f9fa", 
          width: "200px", 
          padding: "20px", 
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          zIndex: 1000 
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
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)", 
          zIndex: 1
        }}>
          {activeContent === "DashboardPage" && <DashboardPage />}
          {activeContent === "calendar" && <CalendarPage />}
          {activeContent === "settings" && <SettingPage/>}
        </section>
      </div>

      <footer className="footer">
        {/* Add footer content here if needed */}
      </footer>
    </div>
  );
};

export default AdminFunction;
