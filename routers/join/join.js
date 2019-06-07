const controller = require('./controller');

const join = () => (req, res, next) => {
  controller.getPage(req, res, next);
};

module.exports = join;