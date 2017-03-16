const Router = require('express').Router();
const { Document } = require('../controllers');

Router.route('/documents')
  .post(Document.create)
  .get(Document.list);

Router.route('/Documents/:id')
  .delete(Document.delete)
  .get(Document.find)
  .put(Document.update);

Router.route('/search/documents')
  .get(Document.findByName);

module.exports.DocumentRouter = Router;
