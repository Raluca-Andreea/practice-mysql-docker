module.exports.isAuthenticated = (req, res, next) => {

  if (req.session.passport.user) {
    next()
  } else {
    res.redirect('/login');
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {

  if (req.session.passport.user) {
    res.redirect('/');
  } else {
    next()
  }
}