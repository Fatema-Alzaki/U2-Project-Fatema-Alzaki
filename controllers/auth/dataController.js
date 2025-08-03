const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async createUser(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.locals.data = user;
      next();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async loginUser(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error('User not found');

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error('Invalid credentials');

      res.locals.data = user;
      next();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
};
