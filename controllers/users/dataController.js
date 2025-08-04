// controllers/users/dataController.js
const User = require('../../models/User')

exports.index = async (req, res, next) => {
  try {
    const users = await User.find()
    res.locals.data = { users } // ✅ Correct format
    return typeof next === 'function' ? next() : res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.show = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.locals.data = { user } // ✅ Also correct this
    return typeof next === 'function' ? next() : res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('User not found')
  }
}
