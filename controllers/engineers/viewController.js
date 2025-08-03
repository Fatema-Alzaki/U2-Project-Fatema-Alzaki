module.exports = {
  showDashboard(req, res) {
    res.render('engineers/Dashboard', { engineer: res.locals.engineer });
  }
};
