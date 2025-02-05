import {jwtDecode } from 'jwt-decode'; // Ensure this is imported correctly

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false; // Return false if no token exists
  return !isTokenExpired(token);
};

export const isTokenExpired = (token) => {
  if (!token) return true; // If there's no token, it's considered expired
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Get the current time in seconds
    return decodedToken.exp < currentTime; // Check if the token is expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If token is invalid, treat it as expired
  }
};

export const isAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role === 'admin'; // Check if the role is 'admin'
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

export const isFocalPerson = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role === 'focal'; // Check if the role is 'focal'
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};
