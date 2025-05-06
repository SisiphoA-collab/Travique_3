import React, { useState } from "react";
import "./css/tripPlanner.css";

const TripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [tripPlan, setTripPlan] = useState(null);

  const suggestedDestinations = [
    "Cape Town, South Africa",
    "Durban, South Africa",
    "Kruger National Park",
    "Victoria Falls",
    "Garden Route",
  ];

  const mediaMap = {
    "Cape Town, South Africa": {
      type: "video",
      url: "https://youtu.be/TnSfqqwQh_Q?si=OTfiKobHXv3KPqIY",
    },
    "Durban, South Africa": {
      type: "youtube",
      url: "https://www.youtube.com/embed/klliZHotGN4",
    },
    "Kruger National Park": {
      type: "video",
      url: "https://player.vimeo.com/external/387609072.sd.mp4?s=dc3be0efc4f41f4edbd31291d7e15eb8b6ccbb69&profile_id=165",
    },
    "Victoria Falls": {
      type: "image",
      url: "https://images.unsplash.com/photo-1602766834081-431f7a2a09e0?auto=format&fit=crop&w=800&q=80",
    },
    "Garden Route": {
      type: "image",
      url: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80",
    },
  };

  const handlePlanTrip = () => {
    if (!destination || !startDate || !endDate) return;

    const plan = {
      destination,
      startDate,
      endDate,
      activities: activities.split(",").map((a) => a.trim()),
    };

    setTripPlan(plan);
  };

  const selectedMedia = mediaMap[destination];

  return (
    <div className="trip-planner-container">
      <h2>🗺️ Trip Planner</h2>

      <div className="form">
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* Suggested Destinations */}
        <div className="suggestions">
          <h4>🌍 Suggested Destinations:</h4>
          <div className="suggestion-tags">
            {suggestedDestinations.map((place, idx) => (
              <button key={idx} onClick={() => setDestination(place)} className="tag">
                {place}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic media preview */}
        {selectedMedia && (
          <div className="media-preview">
            {selectedMedia.type === "image" ? (
              <img src={selectedMedia.url} alt={destination} />
            ) : selectedMedia.type === "youtube" ? (
              <iframe
                width="560"
                height="315"
                src={selectedMedia.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video controls autoPlay muted loop>
                <source src={selectedMedia.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <textarea
          placeholder="Enter activities separated by commas (e.g., hiking, museum, beach)"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
        ></textarea>
        <button onClick={handlePlanTrip}>Create Plan</button>
      </div>

      {tripPlan && (
        <div className="trip-details">
          <h3>📝 Your Trip Plan</h3>
          <p><strong>Destination:</strong> {tripPlan.destination}</p>
          <p><strong>Start:</strong> {tripPlan.startDate}</p>
          <p><strong>End:</strong> {tripPlan.endDate}</p>
          <p><strong>Activities:</strong></p>
          <ul>
            {tripPlan.activities.map((activity, index) => (
              <li key={index}>✅ {activity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
