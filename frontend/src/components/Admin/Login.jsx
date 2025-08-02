import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Keyframes and ripple animation
const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("login-keyframes")) {
  const style = document.createElement("style");
  style.id = "login-keyframes";
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}

const rippleStyle = document.createElement("style");
rippleStyle.innerHTML = `
.ripple {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}
`;
if (!document.getElementById("ripple-style")) {
  rippleStyle.id = "ripple-style";
  document.head.appendChild(rippleStyle);
}

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        withCredentials: true,
      });

      // Save token & userId to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);

      // 🔁 Trigger storage event for other tabs/components
      window.dispatchEvent(new Event("storage"));

      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "❌ Login failed. Please try again.");
    }
  };

  const handleRipple = (e) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${e.nativeEvent.offsetX}px`;
    ripple.style.top = `${e.nativeEvent.offsetY}px`;
    e.target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
          onClick={handleRipple}
        >
          Login
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "2.5rem",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "1.4rem",
    animation: "fadeInUp 0.6s ease-out",
  },
  heading: {
    textAlign: "center",
    color: "#fff",
    fontSize: "2rem",
    fontWeight: "600",
  },
  input: {
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    position: "relative",
    padding: "1rem",
    background: "linear-gradient(to right, #43cea2, #185a9d)",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 0.2s ease-in-out",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "0.95rem",
    textAlign: "center",
  },
};

export default Login;
