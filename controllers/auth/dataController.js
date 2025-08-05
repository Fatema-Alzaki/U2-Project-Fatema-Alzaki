const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  // Create a new user
  async createUser(req, res, next) {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.locals.data = user;
      next();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Log in an existing user
  async loginUser(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error('User not found');

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error('Invalid credentials');

      res.locals.data = user;
      res.locals.data.token = await user.generateToken();
      next();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },

  // Get all users
  async index(req, res, next) {
    try {
      const users = await User.find();
      res.locals.data = { users };
      return typeof next === 'function' ? next() : res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  // Get a single user
  async show(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      res.locals.data = { user };
      return typeof next === 'function' ? next() : res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('User not found');
    }
  }
};
  