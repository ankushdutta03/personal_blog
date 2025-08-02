import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common components
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import PrivateRoute from "./components/Common/PrivateRoute";

// Pages
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";

// Admin
import Dashboard from "./components/Admin/Dashboard";
import Register from './components/Admin/Register';
import Login from "./components/Admin/Login";
import CreatePost from "./components/Admin/CreatePost";
import EditPost from "./components/Admin/EditPost";

// Blog
import BlogList from "./components/Blog/BlogList";
import BlogDetails from "./components/Blog/BlogDetails";

// Styles
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Post Creation & Editing - Protected */}
        <Route path="/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />

        {/* Admin Dashboard - Protected */}
        <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route path="/admin/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
