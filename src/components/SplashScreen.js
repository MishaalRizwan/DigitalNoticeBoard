import React, { useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../animation/splash screen-1 (1).json"; // Replace with the path to your Lottie JSON file
import "./SplashScreen.css"; // Import CSS for styling

const SplashScreen = ({ onLoadComplete }) => {
  useEffect(() => {
    
    const timer = setTimeout(() => {
      onLoadComplete(); // Call the function passed as a prop
    }, 4000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [onLoadComplete]);

  return (
    <div className="splash-screen">
      <Lottie animationData={loadingAnimation} loop={true} style={{ width: "800px", height: "800px" }} />
    </div>
  );
};

export default SplashScreen;
