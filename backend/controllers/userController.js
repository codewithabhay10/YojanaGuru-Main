const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Register a new user
const registerUser = async (req, res) => {
  const { name, age, income, location, occupation, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = await User.create({ name, age, income, location, occupation, email, password });
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { registerUser, loginUser };
