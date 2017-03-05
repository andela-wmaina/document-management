const Router = require('express').Router();
const { User } = require('../controllers');

Router.route('/users/login')
  .post(User.login)

Router.route('/users')
  .post(User.create)
  .get(User.list);

Router.use(User.middleware);

Router.route('/users/:id')
  .get(User.find)
  .put(User.update)
  .delete(User.delete);

module.exports.UserRouter = Router;
