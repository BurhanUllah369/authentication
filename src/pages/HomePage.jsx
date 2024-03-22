import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api/api";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserData = async (token) => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_USER_DATA, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.user_name);
    } catch (error) {
      setErr("Some Error Occured");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUserData(token);
    }
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const login = () => {
    navigate("/login")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{isLoggedIn ? `Welcome, ${username}`: "Please Login"}</h1>
      {isLoggedIn ? (
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={login}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Login
        </button>
      )}

      {err ? <p className="text-red-600 mt-4">{err}</p> : null}
    </div>
  );
};

export default HomePage;
