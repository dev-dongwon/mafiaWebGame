const App = require('./src/application');
const debug = require('./utils/debug')('app');
const path = require('path');
const fs = require('fs');
const serveStatic = require('./middlewares/serve-static');
const app = new App();

const index = (req, res, next) => {
  const publicPath = path.join(__dirname, './public')
  fs.readFile(`${publicPath}/index.html`, (err, data) => {
    if (err) throw err
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(data)
  })
}

const error404 = (req, res, next) => {
  res.statusCode = 404
  res.end('Not Found')
}

const error = (err, req, res, next) => {
  res.statusCode = 500
  res.end()
}

app.use(serveStatic());
app.use(index);
app.use(error404)
app.use(error)

debug('app이 실행되었습니다')
module.exports = app;