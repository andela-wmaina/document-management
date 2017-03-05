const { Document } = require('../controllers');
const { UserRouter } = require('./user.route')
const { Role } = require('../controllers');

module.exports = (app) => {
  // users endpoints
  // app.post('/api/users/login', User.login);
  // app.post('/api/users/logout', User.logout);
  app.use('/api', UserRouter);
  app.use()

  // document endpoints
  app.post('/api/documents', Document.create);
  app.get('/api/documents', Document.list);
  app.get('/api/documents/:documentId', Document.find);
  app.put('/api/documents/:documentId', Document.update);
  app.delete('/api/documents/:documentId', Document.delete);
  // app.get('/api/user', User.middleware, User.document);

  // roles endpoints
  app.post('/api/roles', Role.create);

};
