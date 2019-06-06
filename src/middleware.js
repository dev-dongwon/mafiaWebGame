const middleware = () => {
  const middlewareArr = [];

  const add = (func) => {
    middlewareArr.push(func);
  };

  const run = (request, response) => {
    req = request;
    res = response;
    runMiddleware(0);
  };

  const isErrorMiddleware = (middleware) => {
    return middleware.length === 4;
  };

  const getNextMiddleware = (index) => {
    if (index < 0 || index >= middlewareArr.length) return;
    return middlewareArr[index];
  };

  const runMiddleware = (index, err) => {
    const nextMiddleware = getNextMiddleware(index);
    const next = (err) => runMiddleware(index + 1, err);

    if (err) {
      return isErrorMiddleware(nextMiddleware) ? nextMiddleware(err, req, res, next) : runMiddleware(index + 1, err)
    }

    nextMiddleware(req, res, next);
  };

  return {
    middlewareArr,
    run,
    add,
  }
}

module.exports = middleware;