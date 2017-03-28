const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');
const app = express();
const port = Number(process.env.PORT);
const compiler = webpack(config)

if (NODE_ENV = 'development') {
  require('dotenv').config()
}

// Log requests to the console.
app.use(logger('dev'));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}))

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.get('/*', (req, res) => {
  res.sendFile('index.html', {
    root: 'public'
  })
})

app.listen(port, (eror) => {
  if (eror) {
    throw new Error(error)
  }
  console.log(`Server running on port ${port} on ${app.get('env')} mode`)
});

module.exports = app;
