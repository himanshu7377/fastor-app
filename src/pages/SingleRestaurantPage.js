import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../global.css'

const SingleRestaurantPage = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // Fetch the list of all restaurants
    axios
      .get(`https://staging.fastor.in/v1/m/restaurant`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Find the restaurant with the matching ID
        const foundRestaurant = response.data.find(
          (restaurant) => restaurant.restaurant_id === restaurantId
        );

        // Set the found restaurant in the state
        setRestaurant(foundRestaurant);
      })
      .catch((error) => console.error(error));
  }, [restaurantId]);

  const handleLogoMouseDown = (e) => {
    setIsDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setLogoPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  const { restaurant_name, location, rating, images } = restaurant;

  return (
    <div className="flex flex-col items-center mt-5 relative">
      {/* Status Bar */}
      <div
        id="StatusBarRoot"
        className="flex flex-row justify-between w-[375px] h-10 items-center px-5 z-50"
        style={{ position: "absolute", top: 20, left: 570 }}
      >
        <img
          src="https://file.rendit.io/n/aWZqAWAWoCElPB0F2GJU.svg"
          alt="TimeLightBase"
          id="TimeLightBase"
          className="mt-px w-12"
        />
        <img
          src="https://file.rendit.io/n/TQ56hQnw9M0ar1rl1mh4.svg"
          alt="RightSide"
          id="RightSide"
          className="mt-2 w-16"
        />
      </div>

      {/* Upper part with image */}
      <div
        style={{
          position: "relative",
          height: "400px",
          overflow: "hidden",
          width: "375px",
        }}
      >
        {images && images.length > 0 && (
          <>
            <img
              src={images[0]?.url}
              alt={restaurant_name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              className="fastor-logo"
              style={{
                position: "absolute",
                top: `${logoPosition.y}px`,
                left: `${logoPosition.x}px`,
                cursor: "pointer",
                color:"white"
              }}
              onMouseDown={handleLogoMouseDown}
              draggable="false"
            >
              Fastor Text 
            </div>
          </>
        )}
      </div>

      {/* Lower part with details */}
      <div className="bg-white flex flex-col gap-12 w-[375px] h-[520px] font-['Urbanist'] items-start pl-8 py-4 rounded-tl-[25px] rounded-tr-[25px]">
        <div className="flex flex-col ml-px gap-2 w-5/6 items-start">
          <div className="flex flex-row gap-20 w-full items-start">
            <div className="flex flex-col w-2/3 items-start">
              <div className="text-lg font-bold text-[#1e232c]">
                {restaurant_name}
              </div>
              <div className="font-medium text-[#505259]">
                {location
                  ? `${location.location_locality} ${location.city_name}`
                  : "N/A"}
              </div>
            </div>
            <div className="flex flex-row mt-3 gap-2 w-10 items-start">
              <img
                src="https://file.rendit.io/n/blXn1fvm6a8TFJ8pFkCX.svg"
                alt="Star"
                id="Star"
                className="w-4"
              />
              <div className="text-xs font-medium text-[#595959] mt-px">
                {rating ? rating.restaurant_avg_rating : "N/A"}
              </div>
            </div>
          </div>
          <div className="flex flex-row ml-px gap-2 w-2/5 items-start">
            <img
              src="https://file.rendit.io/n/xBmx8DpLzC07V3retf0r.svg"
              alt="Teenyiconsdiscountoutline"
              className="w-4"
            />
            <div className="text-xs font-semibold text-[#d39171] mt-px">
              <p>4 Offers Trending</p>
            </div>
          </div>
        </div>

        <div className="text-sm font-['Urbanist'] font-medium leading-[16.8px] text-[#515151] w-full">
          Our delicate vanilla cake swirled with chocolate and filled with mocha
          chocolate chip cream and a layer of dark chocolate ganache
        </div>
      </div>
    </div>
  );
};

export default SingleRestaurantPage;
