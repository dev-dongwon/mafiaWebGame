const error404 = () => (req, res, next) => {
  res.statusCode = 404;
  res.end('404 : Not Found page');
}

const error = () => (err, req, res, next) => {
  res.statusCode = 500
  res.end('500 : Internal server error');
}

module.exports = {
  error404,
  error,
}