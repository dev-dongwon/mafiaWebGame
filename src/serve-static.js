const path = require('path');
const fs = require('fs');

const serveStatic = (req, res) => {
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  }

  const ext = path.parse(req.url).ext;
  const publicPath = path.join(__dirname, '../public');

  if (Object.keys(mimeType).includes(ext)) {
    fs.readFile(`${publicPath}${req.url}`, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', mimeType[ext]);
        res.end(data)
      }
    })
  } else {
    res.statusCode = 200;
  }
};

module.exports = serveStatic;