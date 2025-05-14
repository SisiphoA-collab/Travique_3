import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./css/foodfinder.css";

// Mock South African food and restaurant data
const saFoodData = [
  {
    id: 1,
    name: "Bobotie",
    category: "Traditional",
    region: "Western Cape",
    description: "A spiced minced meat dish with an egg-based topping, often served with yellow rice.",
    image: "https://via.placeholder.com/150?text=Bobotie",
    dietary: ["Halal"],
    restaurants: [
      { name: "Cape Malay Kitchen", address: "12 Bo-Kaap, Cape Town", rating: 4.5, price: "Mid-range", lat: -33.921, lng: 18.416 },
      { name: "The Bo-Kaap Eatery", address: "34 Rose St, Cape Town", rating: 4.2, price: "Budget", lat: -33.922, lng: 18.417 }
    ]
  },
  {
    id: 2,
    name: "Ikota (Bunny Chow)",
    category: "Street Food",
    region: "KwaZulu-Natal",
    description: "A hollowed-out loaf of bread filled hot chips,egg,russian,polony, popular in Durban.",
    image: "https://via.placeholder.com/150?text=Bunny+Chow",
    dietary: ["Vegetarian", "Halal"],
    restaurants: [
      { name: "Durban Spice", address: "45 Florida Rd, Durban", rating: 4.7, price: "Budget", lat: -29.833, lng: 31.021 },
      { name: "Curry Corner", address: "12 Grey St, Durban", rating: 4.0, price: "Budget", lat: -29.834, lng: 31.022 }
    ]
  },
  {
    id: 2,
    name: "Amagwinya nesindi (umdundu)",
    category: "Street Food",
    region: "Eastern Cape",
    description: "A hollowed-out loaf of bread filled with curry, popular in Durban.",
    image: "https://via.placeholder.com/150?text=Bunny+Chow",
    dietary: ["Vegetarian", "Halal"],
    restaurants: [
      { name: "Durban Spice", address: "45 Florida Rd, Durban", rating: 4.7, price: "Budget", lat: -29.833, lng: 31.021 },
      { name: "Curry Corner", address: "12 Grey St, Durban", rating: 4.0, price: "Budget", lat: -29.834, lng: 31.022 }
    ]
  },
  {
    id: 2,
    name: "Amanqina (Chicken feet)",
    category: "Street Food",
    region: "KwaZulu-Natal",
    description: "A hollowed-out loaf of bread filled with curry, popular in Durban.",
    image: "https://via.placeholder.com/150?text=Bunny+Chow",
    dietary: ["Vegetarian", "Halal"],
    restaurants: [
      { name: "Durban Spice", address: "45 Florida Rd, Durban", rating: 4.7, price: "Budget", lat: -29.833, lng: 31.021 },
      { name: "Curry Corner", address: "12 Grey St, Durban", rating: 4.0, price: "Budget", lat: -29.834, lng: 31.022 }
    ]
  },
  {
    id: 3,
    name: "Umbengo (Braaied meat)",
    category: "Barbecue",
    region: "Nationwide",
    description: "A South African barbecue featuring grilled meats like boerewors and sosaties.",
    image: "https://via.placeholder.com/150?text=Braai",
    dietary: ["Gluten-Free"],
    restaurants: [
      { name: "The Braai House", address: "78 Main Rd, Johannesburg", rating: 4.8, price: "Mid-range", lat: -26.204, lng: 28.047 }
    ]
  }
];

const FoodFinder = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [filters, setFilters] = useState({ dietary: [], budget: [], region: [] });
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
        () => setError("Unable to access location.")
      );
    }
  }, []);

  // Load favorites from local storage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Search function
  const searchFood = async () => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      // Search TheMealDB for global dishes
      const mealRes = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const mealData = mealRes.data.meals || [];

      // Combine with South African mock data
      const saResults = saFoodData.filter(dish =>
        (!query || dish.name.toLowerCase().includes(query.toLowerCase())) &&
        (filters.dietary.length === 0 || filters.dietary.some(d => dish.dietary.includes(d))) &&
        (filters.budget.length === 0 || dish.restaurants.some(r => filters.budget.includes(r.price))) &&
        (filters.region.length === 0 || filters.region.includes(dish.region))
      );

      const combinedResults = [
        ...saResults,
        ...mealData.map(meal => ({
          id: meal.idMeal,
          name: meal.strMeal,
          category: meal.strCategory,
          region: meal.strArea,
          description: meal.strInstructions.slice(0, 100) + "...",
          image: meal.strMealThumb,
          dietary: ["Unknown"],
          restaurants: []
        }))
      ];

      if (combinedResults.length === 0) {
        setError("No food found matching your criteria.");
      } else {
        setResults(combinedResults);
      }
    } catch (err) {
      setError("Error fetching food data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  // Save to favorites
  const toggleFavorite = (dish) => {
    const updatedFavorites = favorites.some(f => f.id === dish.id)
      ? favorites.filter(f => f.id !== dish.id)
      : [...favorites, dish];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Show modal with dish details
  const showDishDetails = (dish) => setSelectedDish(dish);
  const closeModal = () => setSelectedDish(null);

  return (
    <div className="food-finder-container">
      <h2>🍽️ Food Finder - South Africa</h2>
      
      {/* Search and Filters */}
      <div className="food-form">
        <input
          type="text"
          placeholder="Search for food (e.g., Bobotie, Pizza)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchFood}>Find</button>
      </div>
      
      <div className="filter-section">
        <div className="filter-group">
          <h4>Dietary</h4>
          {["Vegetarian", "Vegan", "Halal", "Gluten-Free"].map(d => (
            <label key={d}>
              <input
                type="checkbox"
                checked={filters.dietary.includes(d)}
                onChange={() => handleFilterChange("dietary", d)}
              /> {d}
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h4>Budget</h4>
          {["Budget", "Mid-range", "Upscale"].map(b => (
            <label key={b}>
              <input
                type="checkbox"
                checked={filters.budget.includes(b)}
                onChange={() => handleFilterChange("budget", b)}
              /> {b}
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h4>Region</h4>
          {["Western Cape", "KwaZulu-Natal", "Gauteng", "Nationwide"].map(r => (
            <label key={r}>
              <input
                type="checkbox"
                checked={filters.region.includes(r)}
                onChange={() => handleFilterChange("region", r)}
              /> {r}
            </label>
          ))}
        </div>
      </div>

      {/* Error and Loading */}
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading...</p>}

      {/* Map */}
      <div className="map-container">
        <MapContainer center={[-33.9249, 18.4241]} zoom={10} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          {results.flatMap(dish => dish.restaurants).map((restaurant, i) => (
            <Marker key={i} position={[restaurant.lat, restaurant.lng]}>
              <Popup>
                {restaurant.name}<br />{restaurant.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Results */}
      <div className="results-grid">
        {results.length === 0 && !query && !loading ? (
          saFoodData.map(dish => (
            <div key={dish.id} className="dish-card">
              <img src={dish.image} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p><strong>Region:</strong> {dish.region}</p>
              <p>{dish.description}</p>
              <button onClick={() => showDishDetails(dish)}>View Details</button>
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite(dish)}
              >
                {favorites.some(f => f.id === dish.id) ? "★ Remove Favorite" : "☆ Add Favorite"}
              </button>
            </div>
          ))
        ) : (
          results.map(dish => (
            <div key={dish.id} className="dish-card">
              <img src={dish.image} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p><strong>Category:</strong> {dish.category}</p>
              <p><strong>Region:</strong> {dish.region}</p>
              <p>{dish.description}</p>
              <button onClick={() => showDishDetails(dish)}>View Details</button>
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite(dish)}
              >
                {favorites.some(f => f.id === dish.id) ? "★ Remove Favorite" : "☆ Add Favorite"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="favorites-section">
          <h3>Your Favorites</h3>
          <div className="results-grid">
            {favorites.map(dish => (
              <div key={dish.id} className="favorite-card">
                <h4>{dish.name}</h4>
                <p><strong>Region:</strong> {dish.region}</p>
                <button
                  className="favorite-btn"
                  onClick={() => toggleFavorite(dish)}
                >
                  ★ Remove Favorite
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Dish Details */}
      {selectedDish && (
        <div className="modal show">
          <div className="modal-content">
            <h3>{selectedDish.name}</h3>
            <img src={selectedDish.image} alt={selectedDish.name} />
            <p><strong>Category:</strong> {selectedDish.category}</p>
            <p><strong>Region:</strong> {selectedDish.region}</p>
            <p><strong>Description:</strong> {selectedDish.description}</p>
            <p><strong>Dietary:</strong> {selectedDish.dietary.join(", ")}</p>
            {selectedDish.restaurants.length > 0 && (
              <>
                <h4>Where to Find It</h4>
                {selectedDish.restaurants.map((r, i) => (
                  <div key={i}>
                    <p><strong>{r.name}</strong></p>
                    <p>{r.address}</p>
                    <p>Rating: {r.rating} | Price: {r.price}</p>
                  </div>
                ))}
              </>
            )}
            <p><strong>Cultural Tip:</strong> In South Africa, sharing food is a sign of hospitality. Try dining at a local shisa nyama for an authentic braai experience!</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodFinder;