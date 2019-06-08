var qs = require('querystring');

const makeBodyObj = (reqBodyStr) => {
  return qs.parse(reqBodyStr);
}

const bodyParser = () => (req, res, next) => {
  let bodyArr = [];

  req.on('data', chunk => {
    bodyArr.push(chunk);
  });

  req.on('end', () => {
    const reqBodyStr = Buffer.concat(bodyArr).toString();
    const bodyObj = makeBodyObj(reqBodyStr);
    console.log(`bodyOBj : ${JSON.stringify(bodyObj)}`)
    req.body = bodyObj;
    next();
  })
}

module.exports = bodyParser;