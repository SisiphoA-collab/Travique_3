import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer} id="contact">
      <p>Travique &copy; 2025. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#00bcd4',
    color: 'white',
    marginTop: '9%',
  }
};

export default Footer;
