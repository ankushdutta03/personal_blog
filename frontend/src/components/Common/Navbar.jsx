import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null);
    navigate("/login");
  };

  // Inject animations once
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }

      .nav-animated-link:hover {
        animation: pulse 0.3s ease-in-out;
        background-color: rgba(255, 255, 255, 0.2);
      }

      .nav-logout:hover {
        background-color: rgba(255, 75, 92, 0.15);
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link} className="nav-animated-link">Home</Link>
      <Link to="/about" style={styles.link} className="nav-animated-link">About</Link>
      <Link to="/contact" style={styles.link} className="nav-animated-link">Contact</Link>
      <Link to="/blogs" style={styles.link} className="nav-animated-link">Blogs</Link>

      {userId ? (
        <>
          <Link to="/create" style={styles.link} className="nav-animated-link">Create</Link>
          <span onClick={handleLogout} style={styles.logout} className="nav-animated-link nav-logout">Logout</span>
        </>
      ) : (
        <>
          <Link to="/login" style={styles.link} className="nav-animated-link">Login</Link>
          <Link to="/register" style={styles.link} className="nav-animated-link">Register</Link>
        </>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    background: "linear-gradient(to right, #00b4db, #0083b0)",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    animation: "slideIn 0.6s ease-out",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderBottom: "4px solid #005f7a",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    padding: "8px 14px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  logout: {
    color: "#ff4b5c",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    padding: "8px 14px",
    borderRadius: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
  },
};

export default Navbar;
