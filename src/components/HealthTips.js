// components/HealthTips.js
import React from "react";
import "./css/healthtips.css";

const healthTips = {
  Nutrition: [
    "Drink plenty of water daily.",
    "Include fruits and vegetables in every meal.",
    "Avoid processed foods and sugary drinks.",
    "Eat whole grains and lean protein."
  ],
  Exercise: [
    "Aim for at least 30 minutes of activity most days.",
    "Stretch before and after workouts.",
    "Try a mix of cardio, strength, and flexibility exercises.",
    "Take short walks during breaks."
  ],
  MentalWellness: [
    "Get at least 7–8 hours of sleep per night.",
    "Practice mindfulness or meditation daily.",
    "Take breaks to avoid burnout.",
    "Talk to someone if you're feeling overwhelmed."
  ],
  Hygiene: [
    "Wash your hands regularly.",
    "Brush and floss twice a day.",
    "Keep your living space clean.",
    "Shower daily and wear clean clothes."
  ]
};

const HealthTips = () => {
  return (
    <div className="health-tips-container">
      <h2>🧠 Health & Wellness Tips</h2>

      {Object.entries(healthTips).map(([category, tips]) => (
        <div key={category} className="tip-section">
          <h3>{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <ul>
            {tips.map((tip, index) => (
              <li key={index}>✅ {tip}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HealthTips;
