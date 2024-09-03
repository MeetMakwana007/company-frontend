"use client";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import LoginPage from "./components/Login/LoginPage";
import HomePage from "./components/Home/HomePage";
import { message } from "antd";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return exp < currentTime;
    } catch (error) {
      console.log("Error: ", error);
      return true;
    }
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const token = userDetails?.token;
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("userDetails");
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setIsAuthenticated(false);
    message.success("Thanks for using, See you again!");
  };

  return (
    <div>
      {isAuthenticated ? (
        <HomePage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}
