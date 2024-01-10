// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("8073253248");
  const navigate = useNavigate();
  const dialCode = "+91";

  const handleLogin = async () => {
    try {
      // Validate mobile number if needed
      if (!mobileNumber) {
        // Handle empty mobile number
        console.error("Mobile number is required.");
        return;
      }

      // Make a POST request to the specified URL with the mobile number
      const response = await axios.post(
        "https://staging.fastor.in/v1/pwa/user/register",
        {
          phone: mobileNumber,
          dial_code: dialCode,
        }
      );

      // Assuming the response contains relevant data or a token
      // You can handle the response data accordingly
      console.log("Login success:", mobileNumber);

      // Navigate to the OTP page with mobileNumber as a parameter
      navigate(`/otpPage/${mobileNumber}`);
    } catch (error) {
      // Handle login failure
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center  mt-10 ">
      <div
        id="ForgotPasswordRoot"
        className="bg-white flex flex-col  justify-between w-[312px] h-[812px] items-center   pt-3 pb-[313px]  border border-orange"
      >
        <div
          id="StatusBarRoot"
          className="flex flex-row justify-between w-full  h-10 items-start  px-5 "
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

        <div className="flex flex-col  gap-10  px-2 font-['Urbanist'] items-start">
          <div className="flex flex-col ml-px w-full items-start">
            <div className="text-2xl font-bold tracking-[-0.26] leading-[33.8px] text-[#1e232c]">
              Enter Your Mobile Number
            </div>
            <div className="font-medium leading-[24px] text-[#8391a1]">
              We will send you the 4 digit verification code
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full items-start">
            <div className="">
              <input className="  text-[#8391a1] border-solid border-[#dadada] bg-[#f7f8f9] flex flex-row w-full h-12 items-start  justify-centerpt-4 px-12 border rounded-lg" placeholder="Enter your Phone Number" value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}/>
            </div>
            <div className="text-center text-sm font-semibold text-white bg-[#ff6d6a] flex flex-row justify-center  w-full h-12 items-start rounded-lg cursor-pointer">
              <button className="w-full h-full " onClick={handleLogin}>Send Code</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
