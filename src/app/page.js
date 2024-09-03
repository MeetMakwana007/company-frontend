"use client";
import React, { useState } from "react";
import LoginPage from "./components/Login/LoginPage";
import HomePage from "./components/Home/HomePage";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? <HomePage /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
}
