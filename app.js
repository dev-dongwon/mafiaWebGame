const App = require('./src/application');
const debug = require('./utils/debug')('app');
const serveStatic = require('./middlewares/serve-static');
const logger = require('./middlewares/logger');
const index = require('./routers/index');
const app = new App();

const error404 = (req, res, next) => {
  res.statusCode = 404
  res.end('Not Found')
}

const error = (err, req, res, next) => {
  res.statusCode = 500
  res.end()
}

app.use(logger());
app.use(serveStatic());
app.use('/', index());
app.use(error404)
app.use(error)

debug('app이 실행되었습니다')
module.exports = app;