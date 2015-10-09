var uc = require('../../controllers/open/uc')

module.exports = function(app) {
  // 登录
  app.route('/open/uc/login').post(uc.login);
}