const path = require('path');
const fs = require('fs');
const csvParser = require('../../../utils/csv-parser');
const cryptoPassword = require('../../../utils/crypto-password');

const checkParameter = (nickname, id, password) => {
  return (nickname && id && password);
}

const getDataObj = async () => {
  return await csvParser.readCsvData('./db/member.csv', csvParser.getDataObj);
}

const getKeyObj = async () => {
  return await csvParser.readCsvData('./db/key.csv', csvParser.getKeyObj);
}

const getCryptoPassword = async (password) => {
  const {key, salt} = await cryptoPassword.makeCryptoPass(password);
  return {
    key,
    salt,
  }
}

const registerMember = async (req, res, next) => {
  let {nickname, id, password} = req.body;
  
  if (!checkParameter(nickname, id, password)) {
    return res.status(400).send('parameter error');
  }
  
  const passwordPair = await getCryptoPassword(password);
  keyObj = await getKeyObj();
  console.log(keyObj);
  
  const dataStr = `\r\n${keyObj.member},${nickname},${id},${passwordPair.key},${passwordPair.salt}`
  csvParser.appendCsvData('./db/member.csv', dataStr);

  

}

module.exports = {
  registerMember
}