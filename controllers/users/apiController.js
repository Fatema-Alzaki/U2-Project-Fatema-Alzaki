const User = require('../../models/User')
const jwt = require('jsonwebtoken')

// Middleware to check JWT in headers
exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) throw new Error('No token')
    const data = jwt.verify(token, 'secret') // replace with process.env.SECRET in production
    const user = await User.findById(data._id)
    if (!user) throw new Error('User not found')
    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

// GET /users/profile (JSON)
exports.getProfile = async (req, res) => {
  res.json({ user: req.user })
}

// PUT /users/:id
exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    updates.forEach(field => req.user[field] = req.body[field])
    await req.user.save()
    res.json(req.user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne()
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
