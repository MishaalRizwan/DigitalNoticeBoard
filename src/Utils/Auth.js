import { jwtDecode } from "jwt-decode"; // Ensure correct import

const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => {
  const token = getToken();
  return token ? !isTokenExpired(token) : false;
};

export const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) return true; // Handle missing 'exp' field
    return decodedToken.exp < Date.now() / 1000;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return true;
  }
};

export const getUserRole = () => {
  const token = getToken();
  try {
    return token ? jwtDecode(token).role || null : null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isAdmin = () => getUserRole() === "admin";
export const isFocalPerson = () => getUserRole() === "focal";
