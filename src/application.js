const http = require('http');

const Application = class {
  constructor() {
    this.server = http.createServer((req, res) => {
      res.setHeader('Content-Type', 'text/plain');
      res.write('hello, node')
      res.end();
    })
  }

  listen(port=3000, host='localhost', func) {
    this.server.listen(port, host, func);
  }
}  

module.exports = Application;