const path = require('path');
const fs = require('fs');
const controller = require('./controller');

const getPage = () => (req, res, next) => {
  controller.getPage(req, res, next);
}

const joinMember = () => {

};

module.exports = {
  getPage,
  joinMember
}