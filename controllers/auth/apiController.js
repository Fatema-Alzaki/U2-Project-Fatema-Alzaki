module.exports = {
  register(req, res) {
    res.status(201).json(res.locals.data)
  },

  login(req, res) {
    res.status(200).json(res.locals.data)
  }
}
