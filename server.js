const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const eventRoutes = require('./routes/events');
const resultRoutes = require('./routes/results');
const galleryRoutes = require('./routes/gallery');
const adminRoutes = require('./routes/admin');
const { seedAdmin } = require('./services/seedService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files for gallery
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin', adminRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artsfest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Auto-seed admin user
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});