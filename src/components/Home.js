import React from 'react';

const Home = () => {
  return (
    <section style={styles.section}>
      <h2>Your Smart Travel Companion</h2>
      <p>Plan trips, check weather, track expenses, find food & get personalized health tips.</p>
    </section>
  );
};

const styles = {
  section: {
    padding: '50px',
    textAlign: 'center',
    backgroundColor: '#f0f8ff'
  }
};

export default Home;
