const csvParser = require('../../../utils/csv-parser');
const cryptoPassword = require('../../../utils/crypto-password');
const messageList = require('../../../utils/message-list');

const checkParameter = (name, id, password) => {
  return (name && id && password);
}

const getMemberDataObj = async () => {
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

const updateKey = async (data) => {
  return await csvParser.overwriteCsvData('./db/key.csv', data);
}

const registerMember = async (req, res, next) => {
  let {name, id, password} = req.body;
  
  if (!checkParameter(name, id, password)) {
    return res.status(400).send('parameter error');
  }
  
  const passwordPair = await getCryptoPassword(password);
  keyObj = await getKeyObj();
  console.log(keyObj);
  
  const dataStr = `\r\n${keyObj.member},${name},${id},${passwordPair.key},${passwordPair.salt}`
  csvParser.appendCsvData('./db/member.csv', dataStr);

  keyObj.member = (keyObj.member*1 + 1);

  // key 업데이트
  const keyDataStr = await csvParser.objDataToCsv(keyObj);
  await updateKey(keyDataStr);
}

const isDupleId = async (inputId) => {
  const memberData = await getMemberDataObj();
  let flag = false;
  Object.keys(memberData).forEach((key) => {
    if (memberData[key]['id'] === inputId) {
      flag = true;
      return;
    }
  })
  return flag;
}

const checkIdforAjax = async (req, res, next) => {
  const flag = await isDupleId(req.query.value);
  let ajaxMessage = messageList.id.checkIdSuccess;
  if (flag) {
    ajaxMessage = messageList.id.checkIdFail;
  };
  return res.status(200).send(ajaxMessage);
}

module.exports = {
  registerMember,
  checkIdforAjax
}