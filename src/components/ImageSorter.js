import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Slide-in animation
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Fade-out animation for removing past events
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// Styled components with conditional dimensions
const ImageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
  animation: ${slideIn} 1s ease-out;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.layout === 'student' ? '300px' : '200px')}; /* Larger for student */
  flex-grow: 1;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  border: 2px solid black;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  animation: ${(props) => (props.fadeOut ? fadeOut : slideIn)} 1s ease-out;
`;

const ColumnContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ColumnImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px;
  width: ${(props) => (props.layout === 'student' ? '90%' : '90%')}; /* Slightly larger for student */
  flex-grow: 1;
  height: ${(props) => (props.layout === 'student' ? '370px' : '270px')}; /* Larger for student */
  box-sizing: border-box;
  border: 2px solid black;
  background-image: url(${(props) => props.bgImage});
  background-size: contain;
  background-position: center;
  animation: ${(props) => (props.fadeOut ? fadeOut : slideIn)} 1s ease-out;
`;

function ImageSorter({ events, layout = 'admin' }) {
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time, just compare dates

    // Filter events that are happening today or in the future
    const updatedEvents = events.filter(event => new Date(event.start) >= today);

    // Update the state with new events
    setFilteredEvents(updatedEvents);
  }, [events]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {filteredEvents.length > 0 && (
        <>
          {/* First Image */}
          <ImageContainer>
            <ImageWrapper bgImage={filteredEvents[0]?.image} layout={layout} />
          </ImageContainer>

          {/* Second Image */}
          <ImageContainer>
            <ImageWrapper bgImage={filteredEvents[1]?.image} layout={layout} />
          </ImageContainer>

          {/* Third and Fourth Images in a column */}
          <ColumnContainer>
            <ColumnImage bgImage={filteredEvents[2]?.image} layout={layout} />
            <ColumnImage bgImage={filteredEvents[3]?.image} layout={layout} />
          </ColumnContainer>
        </>
      )}
    </div>
  );
}

export default ImageSorter;
