const app = require('../app');
const debug = require('../utils/debug')('bin/www')
const host = 'localhost';
const port = 3000;

app.listen(port, host, () => {
  debug(`server running at http://${host}:${port}`);
});