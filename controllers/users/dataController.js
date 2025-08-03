const User = require('../../models/User')

// Show all users (admin feature, optional)
exports.index = async (req, res) => {
  const users = await User.find()
  res.locals.data = users
  return typeof next === 'function' ? next() : res.json(users)
}

// Show single user
exports.show = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.locals.data = user
  return typeof next === 'function' ? next() : res.json(user)
}
