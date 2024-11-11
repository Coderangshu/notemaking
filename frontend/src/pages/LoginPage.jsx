import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // POST request to login
      const response = await axios.post("/api/auth/login/", {
        username: username,
        password: password,
      });

      // If login is successful, store tokens and navigate to notes page
      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        navigate("/notes");
      }
    } catch (error) {
      setErrorMessage("Invalid credentials or error logging in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-96 mb-36">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Notes App</h2>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 text-center">{errorMessage}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="username"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-800">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

