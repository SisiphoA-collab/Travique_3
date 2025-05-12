import React, { useState } from "react";
import "./css/healthtips.css";

const healthTips = {
  General: [
    { tip: "Drink bottled or boiled water to avoid waterborne illnesses.", category: "Hydration", source: "CDC" },
    { tip: "Wash hands frequently with soap and water.", category: "Hygiene", source: "WHO" },
    { tip: "Get 7–8 hours of sleep to stay alert during travel.", category: "Mental Wellness", source: "General" },
    { tip: "Ensure routine vaccinations (e.g., MMR, flu) are up-to-date.", category: "Vaccinations", source: "CDC" },
    { tip: "Carry travel health insurance for medical emergencies.", category: "Safety", source: "GOV.UK" },
  ],
  CapeTown: [
    { tip: "Use sunscreen and stay hydrated due to strong UV rays at the coast.", category: "Sun Protection", source: "CDC" },
    { tip: "Eat at reputable restaurants to avoid foodborne illnesses.", category: "Food Safety", source: "Travel Doctor" },
    { tip: "Swim in marked areas to avoid strong ocean currents.", category: "Water Safety", source: "BHTP" },
    { tip: "Be cautious of petty theft at tourist spots like V&A Waterfront.", category: "Personal Safety", source: "Nomadic Matt" },
  ],
  Johannesburg: [
    { tip: "Take precautions against altitude sickness (e.g., stay hydrated, avoid alcohol).", category: "Altitude", source: "GOV.UK" },
    { tip: "Avoid walking alone at night due to higher crime rates.", category: "Personal Safety", source: "Smartraveller" },
    { tip: "Use insect repellent to prevent mosquito bites.", category: "Insect Protection", source: "CDC" },
    { tip: "Carry a list of local hospitals, as public medical care varies.", category: "Emergency Preparedness", source: "CDC" },
  ],
  EastLondon: [
    { tip: "Use sunscreen and stay hydrated due to strong UV rays at the coast.", category: "Sun Protection", source: "CDC" },
    { tip: "Eat at reputable restaurants to avoid foodborne illnesses.", category: "Food Safety", source: "Travel Doctor" },
    { tip: "Swim in marked areas to avoid strong ocean currents.", category: "Water Safety", source: "BHTP" },
    { tip: "Be cautious of petty theft at tourist spots like V&A Waterfront.", category: "Personal Safety", source: "Nomadic Matt" },
  ],
  Gqeberha: [
    { tip: "Use sunscreen and stay hydrated due to strong UV rays at the coast.", category: "Sun Protection", source: "CDC" },
    { tip: "Eat at reputable restaurants to avoid foodborne illnesses.", category: "Food Safety", source: "Travel Doctor" },
    { tip: "Swim in marked areas to avoid strong ocean currents.", category: "Water Safety", source: "BHTP" },
    { tip: "Be cautious of petty theft at tourist spots like V&A Waterfront.", category: "Personal Safety", source: "Nomadic Matt" },
  ],
  Durban: [
    { tip: "Use sunscreen and stay hydrated due to strong UV rays at the coast.", category: "Sun Protection", source: "CDC" },
    { tip: "Eat at reputable restaurants to avoid foodborne illnesses.", category: "Food Safety", source: "Travel Doctor" },
    { tip: "Swim in marked areas to avoid strong ocean currents.", category: "Water Safety", source: "BHTP" },
    { tip: "Be cautious of petty theft at tourist spots like V&A Waterfront.", category: "Personal Safety", source: "Nomadic Matt" },
  ],
  KrugerNationalPark: [
    { tip: "Take malaria prophylaxis if visiting during rainy season (Nov–Mar).", category: "Malaria Prevention", source: "CDC" },
    { tip: "Use insect repellent and wear long sleeves to avoid mosquito bites.", category: "Insect Protection", source: "Travel Doctor" },
    { tip: "Stay in your vehicle during safaris unless guided.", category: "Wildlife Safety", source: "BHTP" },
    { tip: "Drink bottled water, as tap water may be unsafe in remote areas.", category: "Hydration", source: "CDC" },
  ],
};

const destinations = ["General", "CapeTown", "Johannesburg", "KrugerNationalPark", "EastLondon", "Gqeberha","Durban"];

const HealthTips = () => {
  const [selectedDestination, setSelectedDestination] = useState("General");

  const handleDestinationChange = (e) => {
    setSelectedDestination(e.target.value);
  };

  const tips = healthTips[selectedDestination] || [];

  return (
    <div className="health-tips-container">
      <h2>🧠 Health & Wellness Tips for Your Trip</h2>
      <div className="destination-selector">
        <label htmlFor="destination">Select Destination: </label>
        <select id="destination" value={selectedDestination} onChange={handleDestinationChange}>
          {destinations.map((dest) => (
            <option key={dest} value={dest}>
              {dest.replace(/([A-Z])/g, " $1").trim()}
            </option>
          ))}
        </select>
      </div>

      {tips.length > 0 ? (
        <div className="tips-wrapper">
          {Object.entries(
            tips.reduce((acc, tip) => {
              acc[tip.category] = acc[tip.category] || [];
              acc[tip.category].push(tip);
              return acc;
            }, {})
          ).map(([category, categoryTips]) => (
            <div key={category} className="tip-section">
              <h3>
                {category === "Hydration" && "💧 "}
                {category === "Hygiene" && "🧼 "}
                {category === "Mental Wellness" && "🧘 "}
                {category === "Vaccinations" && "💉 "}
                {category === "Safety" && "🛡️ "}
                {category === "Sun Protection" && "☀️ "}
                {category === "Food Safety" && "🍽️ "}
                {category === "Water Safety" && "🏊 "}
                {category === "Personal Safety" && "🚨 "}
                {category === "Altitude" && "⛰️ "}
                {category === "Insect Protection" && "🦟 "}
                {category === "Emergency Preparedness" && "📞 "}
                {category === "Malaria Prevention" && "💊 "}
                {category === "Wildlife Safety" && "🐘 "}
                {category}
              </h3>
              <ul>
                {categoryTips.map((tip, index) => (
                  <li key={index}>
                    ✅ {tip.tip}{" "}
                    {tip.source !== "General" && (
                      <a
                        href={
                          tip.source === "CDC"
                            ? "https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-africa"
                            : tip.source === "WHO"
                            ? "https://www.who.int/travel-advice"
                            : tip.source === "GOV.UK"
                            ? "https://www.gov.uk/foreign-travel-advice/south-africa"
                            : tip.source === "Travel Doctor"
                            ? "https://www.traveldoctor.com.au/destinations/south-africa"
                            : tip.source === "BHTP"
                            ? "https://www.bhtp.com/travel-insurance/safe-destinations/south-africa"
                            : tip.source === "Nomadic Matt"
                            ? "https://www.nomadicmatt.com/travel-guides/south-africa-travel-tips/"
                            : tip.source === "Smartraveller"
                            ? "https://www.smartraveller.gov.au/destinations/africa/south-africa"
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-link"
                      >
                        ({tip.source})
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No health tips available for this destination. Please check back later or select another destination.</p>
      )}

      <div className="resources">
        <h3>Additional Resources</h3>
        <ul>
          <li>
            <a href="https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-africa" target="_blank" rel="noopener noreferrer">
              CDC Travelers’ Health - South Africa
            </a>
          </li>
          <li>
            <a href="https://www.who.int/travel-advice" target="_blank" rel="noopener noreferrer">
              WHO Travel Advice
            </a>
          </li>
          <li>
            <a href="http://www.health.gov.za/" target="_blank" rel="noopener noreferrer">
              South African Department of Health
            </a>
          </li>
          <li>
            <a href="https://www.fitfortravel.nhs.uk/destinations/africa/south-africa" target="_blank" rel="noopener noreferrer">
              Fit for Travel (NHS)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HealthTips;