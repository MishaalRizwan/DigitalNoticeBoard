import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import User1 from "./pages/User1";
import AdminLogin from "./pages/AdminLogin";
import FocalSignup from "./pages/FocalSignup";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import FocalLogin from "./pages/FocalLogin";
import AdminSignup from "./pages/AdminSignup";
import SplashScreen from "./components/SplashScreen";
import LoadingSpinner from "./components/LoadingSpinner"; // Import LoadingSpinner
import CalendarPage from "./components/calendarpage";
import AdminFunction from './pages/adminfunction'; 
import FocalFunction from './pages/focalfunction';
import DashboardPage from './pages/Dashboard';
import StudentDashboardPage from './pages/student-dashboard';
import PrivateRoute from "./components/PrivateRoute";
import SettingPage from './components/setting';
import TVDashboard from './pages/TVDashboard';

import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isLoading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setSplashVisible(true);
      localStorage.setItem("hasSeenSplash", "true");
    } else {
      setSplashVisible(false);
    }

    // Simulate loading time (e.g., waiting for data or content)
    const loadingTimeout = setTimeout(() => {
      setLoading(false); // Stop loading after a certain time
    }, 5000); // Show spinner for 5 seconds

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleLoadComplete = () => {
    setSplashVisible(false); // Hide splash screen after loading
  };

  return (
    <>
      {isSplashVisible ? (
        <SplashScreen onLoadComplete={handleLoadComplete} />
      ) : isLoading ? (
        <LoadingSpinner /> // Show loading spinner while content is loading
      ) : (
        <Routes>
          <Route path="/" element={<User1 />} />
          <Route path="/user" element={<User1 />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/focal-signup" element={<FocalSignup />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/focal-login" element={<FocalLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/adminfunction" element={<PrivateRoute><AdminFunction /></PrivateRoute>} />
          <Route path="/focalfunction" element={<PrivateRoute><FocalFunction /></PrivateRoute>} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/student-dashboard" element={<StudentDashboardPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/TVDashboard" element={<TVDashboard />} />
        </Routes>
      )}
    </>
  );
}

export default App;
