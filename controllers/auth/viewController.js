module.exports = {
  showLogin(req, res) {
    res.render('engineers/SignIn')
  },
  showRegister(req, res) {
    res.render('engineers/SignUp')
  }
}
