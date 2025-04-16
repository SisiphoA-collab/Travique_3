import React from 'react';
import './Features.css'; // Importing the new CSS file for button styling

const Features = () => {
  const features = [
    'Plan Trips',
    'Check Weather',
    'Track Expenses',
    'Find Food',
    'Get Personalized Health Tips'
  ];

  return (
    <section id="features" style={styles.container}>
      <h3>Core Features</h3>
      <div className="features-container">
        {features.map((feature, index) => (
          <button key={index} className="feature-btn">
            {feature}
          </button>
        ))}
      </div>
    </section>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#fff',
    textAlign: 'center' // Center align the content
  }
};

export default Features;
