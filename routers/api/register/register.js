const controller = require('./controller');
const register = () => async (req, res, next) => {
    controller.registerMember(req, res, next);
}

module.exports = register;