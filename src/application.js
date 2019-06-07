const http = require('http');
const Middleware = require('./middleware');
const response = require('./response');

const Application = class {
  constructor() {
    this.middleware = new Middleware();
    this.server = http.createServer((req, res) => {
      this.middleware.run(req, response(res));
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
}

module.exports = Application;