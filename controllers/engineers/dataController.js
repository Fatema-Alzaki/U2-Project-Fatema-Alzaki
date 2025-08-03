const User = require('../../models/User');
const Project = require('../../models/Project');

module.exports = {
  async getEngineerData(req, res, next) {
    try {
      const user = await User.findById(req.user._id).populate('projects');
      res.locals.engineer = user;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
};
