const { Document } = require('../controllers');
const { UserRouter } = require('./user.route')
const { DocumentRouter } = require('./document.route')
const { RoleRouter } = require('./role.route')

module.exports = (app) => {
  app.use('/api', UserRouter);
  app.use('/api', RoleRouter);
  app.use('/api', DocumentRouter);
};
