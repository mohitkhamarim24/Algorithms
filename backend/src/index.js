const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

app.use(cors());
app.use(express.json()); 

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.user.userId}, you're authenticated!` });
});

app.get('/' , (req,res) => {
     res.send("System is running...")
})

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