const Router = require('express').Router();
const { Role } = require('../controllers');
const { Middleware } = require('../controllers');

Router.route('/roles')
  .post(Middleware.checkPermissionRoles, Role.create)
  .get(Role.list);

module.exports.RoleRouter = Router;
