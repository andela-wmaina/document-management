const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
if (NODE_ENV='development') {
	const dotenv = require('dotenv').config();
}
const port = Number(process.env.PORT) || 1337;

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.get('/*', (req, res) => {
    res.json({
      message: 'something awesome'
    });
  });

app.listen(port, (eror) => {
	if (eror) {s
		throw new Error(error);
	}
	console.log(`Server running on port ${port} on ${app.get('env')} mode`);
});

module.exports = app;
