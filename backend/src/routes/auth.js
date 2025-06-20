const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
