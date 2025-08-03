const User = require('../../models/User')

const dataController = {
  async register(req, res, next) {
    try {
      const user = await User.create(req.body)
      const token = user.generateToken()
      res.locals.data = { user, token }
      next()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user || !(await user.comparePassword(req.body.password))) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
      const token = user.generateToken()
      res.locals.data = { user, token }
      next()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  logout(req, res) {
    res.clearCookie('token').json({ message: 'Logged out' })
  }
}

module.exports = dataController
