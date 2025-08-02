import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosts(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Admin Dashboard</h2>

      <Link to="/admin/create" style={styles.createBtn}>
        ➕ Create New Post
      </Link>

      {posts.length === 0 ? (
        <p style={styles.noPost}>📝 No blog posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={styles.postCard}>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <Link to={`/admin/edit/${post._id}`} style={styles.editBtn}>
              ✏️ Edit
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "60px auto",
    padding: "30px",
    background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
    borderRadius: "20px",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Poppins', sans-serif",
    animation: "fadeIn 0.8s ease",
  },
  heading: {
    fontSize: "2.4rem",
    marginBottom: "30px",
    textAlign: "center",
    color: "#212529",
    fontWeight: "600",
  },
  createBtn: {
    display: "inline-block",
    marginBottom: "25px",
    padding: "12px 24px",
    background: "linear-gradient(to right, #00b09b, #96c93d)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "1rem",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  postCard: {
    background: "#ffffff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "1px solid #dee2e6",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease",
  },
  postTitle: {
    margin: "0 0 12px 0",
    fontSize: "1.3rem",
    color: "#343a40",
    fontWeight: "500",
  },
  editBtn: {
    textDecoration: "none",
    background: "#0d6efd",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "background 0.3s ease",
  },
  noPost: {
    color: "#6c757d",
    fontStyle: "italic",
    fontSize: "1.1rem",
    textAlign: "center",
  },
};
