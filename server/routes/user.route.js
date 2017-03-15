const Router = require('express').Router();
const { User } = require('../controllers');

Router.route('/users/login')
  .post(User.login)

Router.route('/users')
  .post(User.create)

Router.use(User.middleware)

Router.route('/users')
	.get(User.list);

Router.route('/users/:id')
	.delete(User.delete)
	.get(User.find)
	.put(User.update);

Router.route('/users/?limit={integer}&offset={integer}')
	.get(User.pagination)

module.exports.UserRouter = Router;
