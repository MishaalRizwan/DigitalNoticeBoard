import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footer}>
      <div style={styles.weather}>
        Rawalpindi 31°C
      </div>
      <div style={styles.notice}>
        important notice
      </div>
    </div>
  );
};

const styles = {
  footer: {
    backgroundColor: '#00AEEF',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    position: 'absolute',
    bottom: '0',
    width: '100%',
  },
  weather: { padding: '10px' },
  notice: { textAlign: 'center', flexGrow: 1, padding: '10px', fontWeight: 'bold' },
};

export default Footer;
