const Router = require('express').Router();
const { Document } = require('../controllers');
const { Middleware } = require('../controllers');

Router.route('/documents')
  .post(Document.create)
  .get(Document.list);

Router.route('/documents/:id')
  .delete(Middleware.checkPermissionDocs, Document.delete)
  .get(Document.find)
  .put(Middleware.checkPermissionDocs, Document.update);

Router.route('/search/documents')
  .get(Document.findByName);

module.exports.DocumentRouter = Router;
