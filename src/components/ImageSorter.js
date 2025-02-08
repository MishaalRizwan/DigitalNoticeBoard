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

// Styled components
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
  height: 280px;
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
  width: 90%;
  flex-grow: 1;
  height: 270px;
  box-sizing: border-box;
  border: 2px solid black;
  background-image: url(${(props) => props.bgImage});
  background-size: contain;
  background-position: center;
  animation: ${(props) => (props.fadeOut ? fadeOut : slideIn)} 1s ease-out;
`;

function ImageSorter({ events }) {
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
            <ImageWrapper bgImage={filteredEvents[0]?.image} />
          </ImageContainer>

          {/* Second Image */}
          <ImageContainer>
            <ImageWrapper bgImage={filteredEvents[1]?.image} />
          </ImageContainer>

          {/* Third and Fourth Images in a column */}
          <ColumnContainer>
            <ColumnImage bgImage={filteredEvents[2]?.image} />
            <ColumnImage bgImage={filteredEvents[3]?.image} />
          </ColumnContainer>
        </>
      )}
    </div>
  );
}

export default ImageSorter;
