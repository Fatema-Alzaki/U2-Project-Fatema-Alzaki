const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Use environment variable or fallback
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware: Protect routes using JWT
exports.auth = async (req, res, next) => {
  try {
    const token = req.query.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Missing token');

    const data = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(data._id);
    if (!user) throw new Error('User not found');

    req.user = user;
    res.locals.data.token = await user.generateToken(); // For views
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

//  API: Register User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  API: Login User
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const valid = user && await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  API: Get Authenticated User Profile
exports.getProfile = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  API: Update User
exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    updates.forEach(field => user[field] = req.body[field]);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  API: Delete Authenticated User
exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
