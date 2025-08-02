import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        withCredentials: true
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700 animate-fade-in-down">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-200"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition-all duration-200"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition duration-300 shadow-md"
          >
            Login
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center animate-fade-in-up">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
