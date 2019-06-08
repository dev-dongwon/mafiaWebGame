const crypto = require('crypto');

const makeCryptoPass = (password) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve({
          key : key.toString('base64'),
          salt : buf.toString('base64'),
        });
      }); 
    });
  })
};

const checkPass = (dbPass, inputPass, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(inputPass, salt, 100000, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve(key.toString('base64') === dbPass);
    });
  })
}

module.exports = {
  makeCryptoPass,
  checkPass
}