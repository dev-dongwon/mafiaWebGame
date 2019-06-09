const csvParser = require('../../utils/csv-parser');
const cryptoPassword = require('../../utils/crypto-password');
const messageList = require('../../utils/message-list');
const regList = require('../../utils/reg-list');

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
  
  const dataStr = `\r\n${keyObj.member},${name},${id},${passwordPair.key},${passwordPair.salt}`
  csvParser.appendCsvData('./db/member.csv', dataStr);
  
  // key 업데이트
  keyObj.member = (keyObj.member*1 + 1);
  const keyDataStr = await csvParser.objDataToCsv(keyObj);
  await updateKey(keyDataStr);

  // 로그인 페이지로 리다이렉트
  return res.status(200).send('Location', 'http://localhost:3000')
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

// 서버에서 정규식 매칭을 하는게 맞나?
const checkIdforAjax = async (req, res, next) => {
  const inputId = req.query.value
  const isDuplicated = await isDupleId(inputId);
  const isMatchedReg = regList.id.test(inputId);
  
  let ajaxMessage;
  
  if (isDuplicated) {
    ajaxMessage = messageList.id.isDuplicated;
  } else if (!isMatchedReg) {
    ajaxMessage = messageList.id.notMatchedReg;
  } else {
    ajaxMessage = messageList.id.isAvailable;
  }
  
  return res.status(200).send(ajaxMessage);
}

module.exports = {
  registerMember,
  checkIdforAjax
}