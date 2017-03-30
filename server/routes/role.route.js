const Router = require('express').Router();
const { Role } = require('../controllers');
const { Middleware } = require('../controllers');

/* /roles routes */
Router.route('/roles')
  .post(Middleware.checkPermissionRoles, Role.create)
  .get(Role.list);

module.exports.RoleRouter = Router;
