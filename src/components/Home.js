import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaCloudSun, FaMoneyBillWave, FaUtensils, FaHeartbeat } from 'react-icons/fa';
import './css/Home.css';

const Home = () => {
  return (
    <section className="home-section">
      <h2>Welcome to Travique 3</h2>
      <p>Your Smart Travel Companion</p>

      <div className="widgets-container">
        <div className="widget">
          <FaMapMarkedAlt className="widget-icon" />
          <h3>Trip Planner</h3>
          <p>Create & organize trips seamlessly.</p>
        </div>
        <div className="widget">
          <FaCloudSun className="widget-icon" />
          <h3>Weather</h3>
          <p>Get real-time weather updates.</p>
        </div>
        <div className="widget">
          <FaMoneyBillWave className="widget-icon" />
          <h3>Expenses</h3>
          <p>Track your travel expenses easily.</p>
        </div>
        <div className="widget">
          <FaUtensils className="widget-icon" />
          <h3>Food Finder</h3>
          <p>Find the best places to eat nearby.</p>
        </div>
        <div className="widget">
          <FaHeartbeat className="widget-icon" />
          <h3>Health Tips</h3>
          <p>Stay fit & healthy during travel.</p>
        </div>
      </div>

      <Link to="/Login" className="get-started-btn">Get Started</Link>
    </section>
  );
};

export default Home;
