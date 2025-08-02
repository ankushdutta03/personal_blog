import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Keyframe animations
const keyframes = `
@keyframes popUp {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(50px);
  }
  60% {
    transform: scale(1.05) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
button:hover {
  animation: bounce 0.4s ease;
  transform: translateY(-1px);
}
.ripple {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}
`;

if (typeof document !== "undefined" && !document.getElementById("login-keyframes")) {
  const style = document.createElement("style");
  style.id = "login-keyframes";
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      setSuccess("✅ Login successful!");
      setError("");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("User logged in:", res.data.user);

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Login failed", err.response?.data);
      setError(err.response?.data?.message || "❌ Login failed. Please try again.");
      setSuccess("");
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
        <h2 style={styles.heading}>Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} onClick={handleRipple}>
          Login
        </button>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
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
    animation: "popUp 0.6s ease-out",
  },
  heading: {
    textAlign: "center",
    color: "#fff",
    fontSize: "2rem",
    marginBottom: "1rem",
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
  success: {
    color: "#4cd137",
    fontSize: "0.95rem",
    textAlign: "center",
  },
};

export default Login;
