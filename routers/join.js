const path = require('path');
const fs = require('fs');

const join = () => (req, res, next) => {
  const publicPath = path.join(__dirname, '../public')
  fs.readFile(`${publicPath}/join.html`, (err, data) => {
    if (err) throw err
    res.status(200).set('Content-Type', 'text/html').send(data);
  })
}

module.exports = join;