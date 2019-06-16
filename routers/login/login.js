const controller = require('./controller');

const login = () => async (req, res, next) => {
    controller.login(req, res, next);
}

module.exports = {
    login,
}