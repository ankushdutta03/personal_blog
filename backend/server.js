const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://personal-blog-frontend-yp6i.onrender.com'],
  credentials: true
}));
app.use(express.json());

// ✅ Simple test route to confirm backend is reachable
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ API is working from Render!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Error handler
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log('✅ MongoDB connected');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
