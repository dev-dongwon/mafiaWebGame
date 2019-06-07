const crypto = require('crypto');

const makeCryptoPass = (password) => {
  // 64바이트 길이 난수 생성
  crypto.randomBytes(64, (err, buf) => {
    // param : 비밀번호, salt, 반복횟수, 비밀번호길이, 해시알고리즘, callback
    crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
      return {
        key : key.toString('base64'),
        salt : buf.toString('base64'),
      };
    });
  });
};

const checkPass = (dbPass, inputPass, salt) => {
  crypto.pbkdf2(inputPass, salt, 100000, 64, 'sha512', (err, key) => {
    return (key.toString('base64') === dbPass);
  });
}

module.exports = {
  makeCryptoPass,
  checkPass
}