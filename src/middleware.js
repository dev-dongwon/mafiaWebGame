const Middleware = class {
  constructor() {
    this.middlewares = [];
    this.req = null
    this.res = null;
  }

  add(fn) {
    this.middlewares.push(fn)
  }

  run(req, res) {
    this.req = req;
    this.res = res;
    this.runMiddleware(0);
  }

  isErrorMiddleware(middleware) {
    return middleware.length === 4;
  }

  getNextMiddleware(index) {
    if (index < 0 || index >= this.middlewares.length) return;
    return this.middlewares[index];
  }

  runMiddleware(index, err) {
    const nextMiddleware = this.getNextMiddleware(index);
    const next = (err) => this.runMiddleware(index + 1, err)

    if (err) {
      if (this.isErrorMiddleware(nextMiddleware)) {
        nextMiddleware(err, this.req, this.res, next);
      }
      this.runMiddleware(index + 1, err);
    }
    nextMiddleware(this.req, this.res, next);
  }
}

module.exports = Middleware;