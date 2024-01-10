// SingleRestaurantPage.js
import React,{useEffect, useState} from "react";
import axios from "axios";

const SingleRestaurantPage = ({ restaurant }) => {
    const [restaurants,setRestaurants]=useState([])

    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
    
        // Fetch nearby restaurants using REST API with authorization token
        axios
          .get("https://staging.fastor.in/v1/m/restaurant?city_id=118&&", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => setRestaurants(response.data))
          .catch((error) => console.error(error));
      }, []); // Empty dependency array to run the effec
  if (!restaurant) {
    return <p>Loading...</p>;
  }

  const {
    restaurant_name,
    cuisines,
    location,
    rating,
    avg_cost_for_two,
    currency,
    images,
  } = restaurant;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Upper part with image */}
      <div style={{ height: "60%", overflow: "hidden" }}>
        {images && images.length > 0 && (
          <img
            src={images[0]?.url}
            alt={restaurant_name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      {/* Lower part with details */}
      <div style={{ flex: 1, padding: "10px", borderTop: "1px solid #ccc" }}>
        <h1>{restaurant_name}</h1>
        <p>
          <strong>Cuisine:</strong>{" "}
          {cuisines
            ? cuisines.map((cuisine) => cuisine.cuisine_name).join(", ")
            : "N/A"}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {location ? ` ${location.location_locality}` : "N/A"}
        </p>
        <p>
          <strong>Rating:</strong>{" "}
          {rating ? rating.restaurant_avg_rating : "N/A"}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>
            <strong>Average Cost for Two:</strong>{" "}
            {avg_cost_for_two
              ? `${avg_cost_for_two} ${currency.symbol}`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleRestaurantPage;
