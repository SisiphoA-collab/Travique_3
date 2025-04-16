import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Travique</h1>
      <nav>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: '20px',
    backgroundColor: '#00bcd4',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

export default Header;
