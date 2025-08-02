import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem"; // adjust path if needed

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  if (loading) {
    return <p style={styles.message}>Loading blogs...</p>;
  }

  if (posts.length === 0) {
    return <p style={styles.message}>No blogs found.</p>;
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Latest Blog Posts</h1>
      <div style={styles.grid}>
        {posts.map((post) => (
          <BlogItem
            key={post._id}
            post={post}
            currentUserId={currentUserId}
            onDelete={handlePostDelete}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "3rem 2rem",
    background: "linear-gradient(to bottom right, #eef2f3, #dfe6e9)",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.2rem",
    marginBottom: "2rem",
    color: "#2d3436",
    fontWeight: "700",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
    padding: "0 1rem",
  },
  message: {
    textAlign: "center",
    fontSize: "1.2rem",
    padding: "3rem",
    color: "#888",
  },
};

export default BlogList;
