const http = require('http');
const Middleware = require('./middleware');

const Application = class {
  constructor() {
    this.middleware = new Middleware();
    this.server = http.createServer((req, res) => {
      this.middleware.run(req, res);
    })
  }

  listen(port = 3000, host = 'localhost', func) {
    this.server.listen(port, host, func);
  }

  use(func) {
    this.middleware.add(func);
  }
}

module.exports = Application;