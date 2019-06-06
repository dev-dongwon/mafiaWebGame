const server = require('../server');
const host = 'localhost';
const port = 3000;

server.listen(port, host, () => {
  console.log(`server running at http://${host}:${port}`);
});