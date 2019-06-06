const color =  {
  yellowColor: '\x1b[33m',
  greenColor: '\x1b[32m',
  redColor: '\x1b[31m',
  resetColor: '\x1b[0m',
};

const logger = () => (req, res, next) => {
  const log = `${color.yellowColor}[${req.method}]${color.resetColor} ${req.url}`
  console.log(log);
  next();
}

module.exports = logger;