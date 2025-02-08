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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login"); // Redirect if no token is found
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token"); // Remove expired token
        navigate("/admin-login"); // Redirect to admin login
        return;
      }

      // Ensure the logged-in user is an admin
      if (!isAdmin(decodedToken)) {
        navigate("/admin-login"); // Redirect non-admin users
        return;
      }

      setUserInfo(decodedToken); // Set user info if valid
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token"); // Remove invalid token
      navigate("/admin-login"); // Redirect if token is invalid
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
    <div className="user" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar userType="admin" userInfo={userInfo} />

      <div className="page-layout" style={{ display: "flex", flex: 1 }}>
        <aside
          className="sidebar"
          style={{
            backgroundColor: "#f8f9fa",
            width: "200px",
            padding: "20px",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            flexShrink: 0,
            minHeight: "100vh", // Make sure sidebar is full height
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "15px" }}>
              <button onClick={() => handleContentChange("DashboardPage")} style={getButtonStyle("DashboardPage")}>
                Dashboard
              </button>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <button onClick={() => handleContentChange("calendar")} style={getButtonStyle("calendar")}>
                Calendar
              </button>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <button onClick={() => handleContentChange("settings")} style={getButtonStyle("settings")}>
                Settings
              </button>
              <button
  onClick={() => window.open("/TVDashboard", "_blank", "width=1915,height=1040,fullscreen=yes")}
  style={{
    padding: "15px 30px",
    background: "linear-gradient(45deg, #007bff, #00b7ff)",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 123, 255, 0.4)",
    transition: "all 0.3s ease",
  }}
  onMouseOver={(e) => e.target.style.boxShadow = "0 6px 12px rgba(0, 123, 255, 0.6)"}
  onMouseOut={(e) => e.target.style.boxShadow = "0 4px 8px rgba(0, 123, 255, 0.4)"}
>
  Deploy
</button>

            </li>
          </ul>
        </aside>

        <section
          className="content"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#ffffff",
            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1,
            overflowY: "auto",
            minHeight: "100vh", // Make sure content section takes up all available space
          }}
        >
          {activeContent === "DashboardPage" && <DashboardPage />}
          {activeContent === "calendar" && <CalendarPage />}
          {activeContent === "settings" && <SettingPage />}
        </section>
      </div>

      <footer className="footer" style={{ padding: "10px", backgroundColor: "#f1f1f1" }}>
        {/* Add footer content here if needed */}
      </footer>
    </div>
  );
};

export default AdminFunction;
