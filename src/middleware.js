const middleware = () => {
  const middlewares = [];
  let request = null;
  let response = null;

  const add = (func) => {
    middlewares.push(func)
  }

  const run = (req, res) => {
    request = req;
    response = res;
    runMiddleWare(0);
  }

  const runMiddleWare = (index, err) => {
    if (index < 0 || middlewares.length < index) {
      return;
    }

    if (err) {
      const isErrorParam = nextMiddleWare.length === 4;
      return isErrorParam ? nextMiddleWare(err, request, response, next) : runMiddleWare(index + 1, err);
    }

    const nextMiddleWare = middlewares[index];
    const next = (err) => runMiddleWare(index + 1, err);

    if (nextMiddleWare.path) {
      console.log(request.path, nextMiddleWare.path)
      const pathMatched = request.path === nextMiddleWare.path &&
        request.method.toLowerCase() === (nextMiddleWare.method || 'get'); // 기본값 get 설정
      return pathMatched ? nextMiddleWare(request, response, next) : runMiddleWare(index + 1);
    }
    nextMiddleWare(request, response, next);
  }


  return {
    middlewares,
    add,
    run
  }
}

module.exports = middleware;