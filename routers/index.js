const path = require('path');
const fs = require('fs');

const index = () => (req, res, next) => {
  const publicPath = path.join(__dirname, '../public')
  fs.readFile(`${publicPath}/index.html`, (err, data) => {
    if (err) throw err
    res.status(200).set('Content-Type', 'text/html').send(data);
  })
}

module.exports = index;