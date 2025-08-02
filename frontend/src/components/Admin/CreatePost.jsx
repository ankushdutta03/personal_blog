import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // ✅ get JWT token from localStorage
    if (!token) {
      setMessage("User not logged in.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        {
          title: form.title,
          content: form.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach token in Authorization header
          },
        }
      );

      setMessage("Blog created successfully!");
      setForm({ title: "", content: "" });
    } catch (err) {
      console.error("Error creating blog:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          rows={8}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit">Publish</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePost;
