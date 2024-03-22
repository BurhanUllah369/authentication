import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate()

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     const decodedToken = jwtDecode(accessToken);
  //     setUserId(decodedToken.userId);

  //     axios.get(BASE_URL, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     })
  //     .then(response => {
  //       const { username } = response.data;
  //       setUserName(username);
  //       console.log(username)
  //     })
  //     .catch(error => {
  //       console.error("Failed to fetch user data:", error);
  //     });
  //   }
  // }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login")
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {userName}</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
      {/* <div className="flex gap-8 mt-8">
        <Link className="text-blue-500 underline" to="/register">
          Register
        </Link>
        <Link className="text-blue-500 underline" to="/login">
          Login
        </Link>
      </div> */}
    </div>
  );
};

export default HomePage;
