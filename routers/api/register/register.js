const controller = require('./controller');

const register = () => async (req, res, next) => {
    controller.registerMember(req, res, next);
}

const ajaxIdCheck = () => (req, res, next) => {
    controller.checkIdforAjax(req, res, next);
}
module.exports = {
    register,
    ajaxIdCheck
}