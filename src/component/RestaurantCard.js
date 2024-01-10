// RestaurantCard.js
import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
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
    <Link
      to={`/restaurants/${restaurant.restaurant_id}`} // Adjust the link based on your routing setup
      style={{
        textDecoration: "none", // Remove default link styling
        color: "inherit", // Inherit color from parent
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          margin: "10px",
          borderRadius: "8px",
          display: "flex",
        }}
      >
        {/* Left side with image */}
        <div
          style={{
            width: "50%",
            height: "150px",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          {images && images.length > 0 && (
            <img
              src={images[0]?.url}
              alt={restaurant_name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>

        {/* Right side with details */}
        <div style={{ width: "60%", paddingLeft: "10px" }}>
          <strong>
            {" "}
            <h1 style={{}}>{restaurant_name}</h1>
          </strong>
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
    </Link>
  );
};

export default RestaurantCard;
