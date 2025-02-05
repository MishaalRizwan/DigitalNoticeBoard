import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isTokenExpired } from "../Utils/Auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      setSessionExpired(true);
      localStorage.removeItem("token"); // Clear the token from storage
      setTimeout(() => {
        window.location.href = "/admin-login"; // Redirect after a delay
      }, 3000); // Delay of 3 seconds for user to read the message
    }
  }, [token]);

  if (sessionExpired) {
    return (
      <div className="session-expired-message">
        <h2>Your session has expired. Redirecting to login...</h2>
      </div>
    );
  }

  return isAuthenticated() ? children : <Navigate to="/focal-login" replace />;
};

export default PrivateRoute;
