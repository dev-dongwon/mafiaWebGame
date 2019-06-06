const http = require('http');
const path = require('path');
const fs = require('fs');

const Application = class {
  constructor() {
    this.server = http.createServer((req, res) => {

      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      const filePath = path.join(__dirname, '../public/index.html');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err
        res.end(data);
      })
    })
  }

  listen(port = 3000, host = 'localhost', func) {
    this.server.listen(port, host, func);
  }
}

module.exports = Application;