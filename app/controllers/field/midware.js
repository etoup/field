// midware for user
exports.signinRequired = function(req, res, next) {
  var field = req.session.field

  if (!field) {
    return res.redirect('/field/uc/login')
  }

  next()
}

