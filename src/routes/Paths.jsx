import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import HomePage from "../pages/HomePage";
import PrivateRoutes from "./PrivateRoutes";

const Paths = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes isLoggedIn={isLoggedIn}>
        <HomePage/>
      </PrivateRoutes>} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Paths;
