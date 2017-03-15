const Router = require('express').Router();
const { Document } = require('../controllers');

Router.route('/documents')
  .post(Document.create)
  .get(Document.list);

Router.route('/documents/:id')
	.delete(Document.delete)
	.get(Document.find)
	.put(Document.update);

Router.route('/documents/?limit={integer}&offset={integer}')
	.get(Document.pagination)

module.exports.DocumentRouter = Router;