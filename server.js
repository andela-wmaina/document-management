const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./server/routes');

const app = express();
const port = Number(process.env.PORT) || 1337;
if (NODE_ENV = 'development') {
  const dotenv = require('dotenv').config();
}

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

app.get('/*', (req, res) => {
  res.sendFile('Documentation.html', {
    root: '.'
  });
});

app.listen(port, (error) => {
  if (error) {
    throw new Error(error);
  }
  console.log(`Server running on port ${port} on ${app.get('env')} mode`);
});

module.exports = app;
