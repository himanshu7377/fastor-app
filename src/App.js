// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
// import RestaurantList from './RestaurantList';
// import RestaurantDetail from './RestaurantDetail';
import './global.css'; 
import OtpPage from './pages/otp';
import RestaurantList from './pages/RestaurantList';
import SingleRestaurantPage from './pages/SingleRestaurantPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path='/otpPage/:mobileNumber' element={<OtpPage  />}/>
        <Route path="/RestaurantList" element={<RestaurantList />} />
        <Route path="/restaurants/:restaurantId" element={<SingleRestaurantPage  />} />
      </Routes>
    </Router>
  );
};

export default App;
