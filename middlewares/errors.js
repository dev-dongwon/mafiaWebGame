const error404 = () => (req, res, next) => {
  res.statusCode = 404
  res.end('Not Found')
}

const error = () => (err, req, res, next) => {
  res.statusCode = 500
  res.end()
}

module.exports = {
  error404,
  error,
}