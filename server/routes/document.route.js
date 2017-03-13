const Router = require('express').Router();
const { Document } = require('../controllers');

Router.route('/documents')
  .post(Document.create)
  .get(Document.list);

Router.route('/Documents/:id')
	.delete(Document.delete)
	.get(Document.find)
	.put(Document.update);

module.exports.DocumentRouter = Router;