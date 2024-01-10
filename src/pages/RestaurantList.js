// RestaurantList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RestaurantCard from '../component/RestaurantCard';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  // console.log(restaurants);
  
  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
    // console.log(token)

    // Fetch nearby restaurants using REST API with authorization token
    axios.get('https://staging.fastor.in/v1/m/restaurant?city_id=118&&', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => setRestaurants(response.data))
      .catch(error => console.error(error));
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h2>Restaurants Nearby</h2>
      {restaurants.length > 0 ? (
        <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.restaurant_id}>
            <Link to={`/restaurants/${restaurant.restaurant_id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <RestaurantCard restaurant={restaurant} />
            </Link>
          </li>
        ))}
      </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RestaurantList;
