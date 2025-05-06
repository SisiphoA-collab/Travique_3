import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Dashboard</h3>
      <ul>
        <li><Link to="/dashboard/trip-planner">Trip Planner</Link></li>
        <li><Link to="/dashboard/weather">Check Weather</Link></li>
        <li><Link to="/dashboard/food-finder">Food Finder</Link></li>
        <li><Link to="/dashboard/expenses">Expenses</Link></li>
        <li><Link to="/dashboard/health-tips">Health Tips</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
