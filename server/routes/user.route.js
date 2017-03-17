const Router = require('express').Router();
const { User } = require('../controllers');

Router.route('/users/login')
  .post(User.login);

Router.route('/users')
  .post(User.create)

Router.use(User.middleware)

Router.route('/users')
  .get(User.list);

Router.use(User.middleware);

Router.route('/users/:id')
  .delete(User.delete)
  .get(User.find)
  .put(User.update);

Router.route('/search/users')
  .get(User.findByName);

module.exports.UserRouter = Router;
