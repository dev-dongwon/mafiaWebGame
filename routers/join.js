const path = require('path');
const fs = require('fs');

const getPage = () => (req, res, next) => {
  const publicPath = path.join(__dirname, '../public')
  fs.readFile(`${publicPath}/join.html`, (err, data) => {
    if (err) throw err
    res.status(200).set('Content-Type', 'text/html').send(data);
  })
}

const joinMember = () => {

};

module.exports = {
  getPage,
  joinMember
}