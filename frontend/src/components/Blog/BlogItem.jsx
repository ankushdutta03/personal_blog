import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogItem = ({ post, currentUserId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Blog deleted!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

  const isAuthor =
    currentUserId &&
    post.author &&
    (currentUserId === post.author._id || currentUserId === post.author);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{post.title}</h3>
      <p style={styles.content}>
        {post.content.length > 120 ? post.content.slice(0, 120) + "..." : post.content}
      </p>

      <Link to={`/blogs/${post._id}`} style={styles.readMore}>
        Read more →
      </Link>

      {isAuthor && (
        <div style={styles.buttonGroup}>
          <button onClick={handleDelete} style={styles.deleteBtn}>
            🗑 Delete
          </button>
          <button onClick={() => navigate(`/edit/${post._id}`)} style={styles.editBtn}>
            ✏️ Edit
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    animation: "fadeSlideIn 0.5s ease forwards",
  },
  title: {
    fontSize: "1.4rem",
    color: "#222",
    marginBottom: "10px",
  },
  content: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "12px",
    lineHeight: "1.5",
  },
  readMore: {
    color: "#1e90ff",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s",
  },
  buttonGroup: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4f",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  editBtn: {
    backgroundColor: "#1890ff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
};

if (typeof document !== "undefined" && !window.__blogItemAnimationInjected) {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    a:hover {
      color: #0d6efd;
    }

    button:hover {
      opacity: 0.9;
    }
  `;
  document.head.appendChild(style);
  window.__blogItemAnimationInjected = true;
}

export default BlogItem;
