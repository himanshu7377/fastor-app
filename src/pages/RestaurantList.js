// RestaurantList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "../component/RestaurantCard";


const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);


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
  }, []); // Empty dependency array to run the effect only once

  

  return (
    <div className="flex items-center justify-center">
      <div className="w-[375px] flex flex-col items-center">
        <h2>Restaurants Nearby</h2>
        {restaurants.length > 0 ? (
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.restaurant_id}>
                <RestaurantCard
                  key={restaurant.restaurant_id}
                  restaurant={restaurant}
                  
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>

    </div>
  );
};

export default RestaurantList;
