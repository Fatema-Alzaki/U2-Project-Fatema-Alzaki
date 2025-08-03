module.exports = {
  index(req, res) {
    res.render('users/Index', { users: res.locals.data })
  },
  show(req, res) {
    res.render('users/Show', { user: res.locals.data })
  },
  edit(req, res) {
    res.render('users/Edit', { user: res.locals.data })
  },
  profile(req, res) {
    res.render('users/Profile', { user: req.user }) // after auth middleware
  }
}
