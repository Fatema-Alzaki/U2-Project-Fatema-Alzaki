const viewController = {
  signUp(req, res) {
    res.render('engineers/SignUp');
  },

  signIn(req, res) {
    res.render('engineers/SignIn');
  },

  apiAuth(req, res) {
    res.json({ user: req.user, token: res.locals.data.token });
  },

  redirectToLogin(req, res) {
    res.redirect('/auth/signin');
  }
};

module.exports = viewController;
