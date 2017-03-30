const Router = require('express').Router();
const { User } = require('../controllers');
const { Middleware } = require('../controllers');

/* /users/login routes */
Router.route('/users/login')
  .post(User.login);

/* /users routes */
Router.route('/users')
  .post(User.create)
  .get(User.list);

/* authentication middleware */
Router.use(Middleware.authMiddleware);

/* /users/:id routes */
Router.route('/users/:id')
  .delete(Middleware.checkPermissionUsers, User.delete)
  .get(User.find)
  .put(Middleware.checkPermissionUsers, User.update);

/* search/users routes */
Router.route('/search/users')
  .get(User.findByName);

module.exports.UserRouter = Router;
