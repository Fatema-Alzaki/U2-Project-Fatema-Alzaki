const viewController = {
  signUp(req, res) {
    res.render('engineers/SignUp');
  },

  signIn(req, res) {
    res.render('engineers/SignIn', {
      ...res.locals.data,
      token: req.query && req.query.token ? req.query.token : res.locals.data.token
    });
  },

  apiAuth(req, res) {
    res.json({ user: req.user, token: res.locals.data.token });
  },

  redirectToLogin(req, res) {
    res.redirect('/auth/signin');
  },

  redirectToHome(req, res) {
    const token = res.locals.data.token ? res.locals.data.token : req.query.token
    if (token) {
      res.redirect(`/?token=${token}`);
    } else {
      res.redirect(`/`);
    }

  },
  index(req, res) {
    const users = res.locals.data.users || []  // ensures .map won't fail
    res.render('users/Index', { users, token: res.locals.data.token })
  },

  // Renders the profile page for the logged-in user
  profile(req, res) {
    res.render('users/Profile', { user: req.user, token: res.locals.data.token })  // pulled from auth middleware
  },

  // Renders a single user's detail view
  show(req, res) {
    const user = res.locals.data.user || res.locals.data  // fallback if data shape differs
    res.render('users/Show', { user, token: res.locals.data.token })
  },

  // Renders the user edit form
  edit(req, res) {
    const user = res.locals.data.user || res.locals.data
    res.render('users/Edit', { user, token: res.locals.data.token })
  }

};

module.exports = viewController;
