import React from 'react';
import { ClipLoader } from "react-spinners"; // or any other spinner from react-spinners

import { RingLoader } from 'react-spinners'; // Using the 'RingLoader' spinner from react-spinners

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <RingLoader size={150} color={"#3498db"} loading={true} />
    </div>
  );
};

export default LoadingSpinner;
