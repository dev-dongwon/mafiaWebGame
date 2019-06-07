const makeBodyObj = (reqBodyStr) => {
  return reqBodyStr.split('&').reduce((acc, pair) => {
    if (!pair) return reqBodyStr;
    const keyValueArr = pair.split('=');
    acc[keyValueArr[0]] = keyValueArr[1];
    return acc;
  }, {});
}

const bodyParser = () => (req, res, next) => {
  let bodyArr = [];

  req.on('data', chunk => {
    bodyArr.push(chunk);
  });

  req.on('end', () => {
    const reqBodyStr = Buffer.concat(bodyArr).toString();
    const bodyObj = makeBodyObj(reqBodyStr);
    req.body = bodyObj;
    next();
  })
}

module.exports = bodyParser;