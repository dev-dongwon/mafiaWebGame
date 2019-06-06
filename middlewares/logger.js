const color =  {
  yellowColor: '\x1b[33m',
  greenColor: '\x1b[32m',
  cyanColor: '\x1b[36m',
  redColor: '\x1b[31m',
  resetColor: '\x1b[0m',
};

const getMethodColor = {
  get : color.greenColor,
  post : color.yellowColor,
  put : color.cyanColor,
  delete: color.redColor,
}

const logger = () => (req, res, next) => {
  const log = `${getMethodColor[req.method.toLowerCase()]}[${req.method}]${color.resetColor} ${req.url}`
  console.log(log);
  next();
}

module.exports = logger;