const App = require('./src/application');
const debug = require('./utils/debug')('app');
const serveStatic = require('./middlewares/serve-static');
const logger = require('./middlewares/logger');
const errors = require('./middlewares/errors');
const bodyParser = require('./middlewares/body-parser');
const index = require('./routers/index');
const join = require('./routers/join/join');
const register = require('./routers/register/register');
const login = require('./routers/login/login')
const app = new App();

app.use(logger());
app.use(bodyParser());
app.use(serveStatic());
app.get('/', index());
app.get('/join', join());
app.post('/register', register.register());
app.get('/register/id', register.ajaxIdCheck());
app.post('/login', login.login());
app.use(errors.error404());
app.use(errors.error());

debug('app이 실행되었습니다')
module.exports = app;