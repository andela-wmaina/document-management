const Router = require('express').Router();
const { Document } = require('../controllers');
const { Middleware } = require('../controllers');

/* /documents routes */
Router.route('/documents')
  .post(Document.create)
  .get(Middleware.checkUser, Document.list);

/* /documents/:id routes */
Router.route('/documents/:id')
  .delete(Middleware.checkPermissionDocs, Document.delete)
  .get(Document.find)
  .put(Middleware.checkPermissionDocs, Document.update);

/* search/documents routes */
Router.route('/search/documents')
  .get(Document.findByTitle);

module.exports.DocumentRouter = Router;
