import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      alert("Blog deleted successfully");
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting blog");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeSlideIn {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  if (!post) return <p style={styles.loading}>Loading...</p>;

  const isAuthor = userId === post.author?._id;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{post.title}</h2>
        <p style={styles.content}>{post.content}</p>
        <p style={styles.author}>
          <strong>Author:</strong> {post.author?.name || "Unknown"}
        </p>

        {isAuthor && (
          <div style={styles.buttonGroup}>
            <button style={styles.editButton} onClick={handleEdit}>
              ✏️ Edit
            </button>
            <button style={styles.deleteButton} onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    maxWidth: "700px",
    width: "100%",
    animation: "fadeSlideIn 0.6s ease-out",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#333",
    fontWeight: "bold",
  },
  content: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: "#444",
    marginBottom: "1.5rem",
  },
  author: {
    fontSize: "0.9rem",
    color: "#666",
    textAlign: "right",
    marginBottom: "1rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  editButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    padding: "2rem",
    color: "#888",
  },
};

export default BlogDetails;
