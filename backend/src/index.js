import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authMiddleware from './middleware/authMiddleware.js';
import problemRoutes from './routes/problem.js';
import authRoutes from './routes/auth.js';
import submissionRoutes from './routes/submission.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.user.userId}, you're authenticated!` });
});

// Problem routes
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);


// Health check
app.get('/', (req, res) => {
  res.send("System is running...");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`🟢 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
