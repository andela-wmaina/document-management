const Router = require('express').Router();
const { User } = require('../controllers');

Router.route('/users/login')
  .post(User.login)

Router.route('/users')
  .post(User.create)
  .get(User.list);

Router.route('/users/:id')
	.delete(User.delete)
	.get(User.find)
	.put(User.update);

module.exports.UserRouter = Router;
