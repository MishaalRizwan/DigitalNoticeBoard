import React from 'react';

const BackgroundImage = () => {
  const backgroundImageStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh', // Adjust height as needed
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0.6)), url("/background-image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={backgroundImageStyle}>
      {/* No need for an additional div for overlay */}
    </div>
  );
};

export default BackgroundImage;
