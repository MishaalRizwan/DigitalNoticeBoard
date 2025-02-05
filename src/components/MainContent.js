import React from 'react';

const MainContent = () => {
  return (
    <div style={styles.mainContent}>
      <div style={styles.block}></div>
      <div style={styles.block}></div>
      <div style={styles.block}></div>
      <div style={styles.block}></div>
    </div>
  );
};

const styles = {
  mainContent: {
    display: 'flex',
    justifyContent: 'space-around',
    flexGrow: 1,
    padding: '20px',
  },
  block: {
    width: '150px',
    height: '200px',
    backgroundColor: '#e0e0e0',
  },
};

export default MainContent;
