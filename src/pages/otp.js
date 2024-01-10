import React, { useState } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import axios from "axios";

const OtpPage = () => {
  const [otp, setOtp] = useState('123456');
  const navigate = useNavigate();
  const { mobileNumber } = useParams();

  const handleVerifyOTP = async () => {
    try {

      const otpString = otp // Combine the OTP digits into a single string

      const response = await axios.post(
        "https://staging.fastor.in/v1/pwa/user/login",
        {
          phone: mobileNumber,
          dial_code: "+91",
          otp: otpString,
        }
      );

    //   console.log("Request Data:", {
    //     mobile_number: mobileNumber,
    //     dial_code: "+91",
    //     otp: otpString,
    //   });
    //   console.log("Response Data:", response.data);

      if (response.data.status === "Success") {
        alert("OTP verified successfully! User logged in.");
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        navigate("/RestaurantList"); // Redirect to the list of restaurants page
      } else {
        alert("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleResendOTP = () => {
    // Implement logic to resend OTP
    // You can make an API call or handle the resend process based on your requirements
    alert("Resending OTP...");
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div
        id="ForgotPasswordRoot"
        className="bg-white flex flex-col justify-between w-[375px] h-[812px] items-center pt-3 pb-[313px] border border-orange"
      >
        <div
          id="StatusBarRoot"
          className="flex flex-row justify-between w-full h-10 items-start px-5"
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

        <div className="flex flex-col gap-10 px-5 font-['Urbanist'] items-center">
          <div className="flex flex-col ml-px w-full items-start">
            <div className="text-2xl font-bold tracking-[-0.26] leading-[33.8px] text-[#1e232c]">
              OTP Verification
            </div>
            <div className="font-medium leading-[24px] text-[#8391a1]">
              Enter the verification code we just sent on your Mobile Number
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full items-start">
            <div className="flex w-full space-x-2">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  className="text-[#8391a1] border-solid border-[#dadada] bg-[#f7f8f9] w-12 h-12 text-center border rounded-lg"
                  maxLength="1"
                  value={otp[index]}
                 onChange={(e) => {
  const updatedOtp = [...otp];
  updatedOtp[index] = e.target.value;
  setOtp(updatedOtp);
  console.log("Input changed:", updatedOtp);
}}
                />
                
              ))
              }
            </div>

            <div className="text-center text-sm font-semibold text-white bg-[#ff6d6a] flex flex-row justify-center w-full h-12 items-start rounded-lg cursor-pointer">
              <button className="w-full h-full" onClick={handleVerifyOTP}>
                Verify
              </button>
            </div>
            <div className="flex ml-12">
              <p className="flex items-center">Didn’t receive code?</p>
              <a
                href="/login"
                className="ml-1 text-blue-500 hover:text-blue-700"
                onClick={handleResendOTP}
              >
                Resend
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
