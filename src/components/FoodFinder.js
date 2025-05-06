// components/FoodFinder.js
import React, { useState } from "react";
import axios from "axios";
import "./css/foodfinder.css";

const FoodFinder = () => {
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState("");

  const searchMeal = async () => {
    setMeal(null);
    setError("");

    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`);
      const data = res.data;

      if (!data.meals) {
        setError("No meal found.");
      } else {
        setMeal(data.meals[0]); // just showing the first match
      }
    } catch (err) {
      setError("Error fetching meal data.");
    }
  };

  return (
    <div className="food-finder-container">
      <h2>🍽️ Food Finder</h2>
      <div className="food-form">
        <input
          type="text"
          placeholder="Search for a food (e.g., pizza)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMeal}>Find</button>
      </div>

      {error && <p className="error">{error}</p>}

      {meal && (
        <div className="meal-info">
          <h3>{meal.strMeal}</h3>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <p><strong>Category:</strong> {meal.strCategory}</p>
          <p><strong>Area:</strong> {meal.strArea}</p>
          <p><strong>Instructions:</strong> {meal.strInstructions.slice(0, 200)}...</p>
          <a href={meal.strSource || meal.strYoutube} target="_blank" rel="noopener noreferrer">
            View Full Recipe
          </a>
        </div>
      )}
    </div>
  );
};

export default FoodFinder;
