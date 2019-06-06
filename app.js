const App = require('./src/application');
const debug = require('./utils/debug')('app')
const app = new App();

debug('app이 실행되었습니다')
module.exports = app;