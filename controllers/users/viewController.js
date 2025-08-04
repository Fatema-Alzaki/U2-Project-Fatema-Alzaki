// controllers/users/viewController.js

module.exports = {
  // Renders a list of all users
  index(req, res) {
    const users = res.locals.data.users || []  // ensures .map won't fail
    res.render('users/Index', { users })
  },

  // Renders the profile page for the logged-in user
  profile(req, res) {
    res.render('users/Profile', { user: req.user })  // pulled from auth middleware
  },

  // Renders a single user's detail view
  show(req, res) {
    const user = res.locals.data.user || res.locals.data  // fallback if data shape differs
    res.render('users/Show', { user })
  },

  // Renders the user edit form
  edit(req, res) {
    const user = res.locals.data.user || res.locals.data
    res.render('users/Edit', { user })
  }
}
