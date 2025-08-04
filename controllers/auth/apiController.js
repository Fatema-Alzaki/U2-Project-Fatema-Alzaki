const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// API middleware (auth using headers)
exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, 'secret'); // Use env var in production!
    const user = await User.findById(data._id);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

// API Register
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ _id: user._id }, 'secret'); // Use env var in production!
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// API Login
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const valid = user && await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, 'secret');
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// API Update
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

// API Delete
exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// API Profile
exports.getProfile = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.generateToken();
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/plants'); // or dashboard
  } catch (err) {
    console.error(err);
    res.status(400).send('Signup failed');
  }
};
