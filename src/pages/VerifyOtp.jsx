import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api/api";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailStored = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Invalid OTP. Please enter a 6-digit code.");
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.VERIFY_OTP, {
        email: emailStored,
        otp,
      });

      localStorage.removeItem("email"); 
      navigate("/login"); 
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="p-12 mx-auto">
      <h1 className="text-center text-3xl font-bold mb-6">Please verify OTP</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={`w-full p-2 outline-none border-2 border-gray-200 rounded-md mt-2 ${
            error && "border-red-500"
          }`}
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          className="block mx-auto bg-blue-500 py-2 px-8 rounded-md text-white mt-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
