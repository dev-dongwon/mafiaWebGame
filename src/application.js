const http = require('http');
const Middleware = require('./middleware');
const response = require('./response');
const request = require('./request');

const Application = class {
  constructor() {
    this.middleware = Middleware();
    this.server = http.createServer((req, res) => {
      this.middleware.run(request(req), response(res));
    })
  }

  listen(port = 3000, host = 'localhost', func) {
    this.server.listen(port, host, func);
  }

  use(path, func) {
    if (typeof path === 'string' && typeof func === 'function') {
      func.path = path;
    } else if (typeof path === 'function'){
      func = path;
    } else {
      console.error('use(func) 혹은 use(path, func)를 써주세요');
    }
    this.middleware.add(func);
  }

  get(path, func) {
    if (!path || !func) throw Error('path and func is required');
    func.method = 'get';
    this.use(path, func);
  }

  post(path, func) {
    if (!path || !func) throw Error('path and func is required');
    func.method = 'post';
    this.use(path, func);
  }
}

module.exports = Application;