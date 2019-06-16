const csvParser = require('../../utils/csv-parser');
const cryptoPassword = require('../../utils/crypto-password');

const loginController = {

  async getMemberDataObj() {
    return await csvParser.readCsvData('./db/member.csv', csvParser.getMemberObj);
  },

  getMemberObj(memberObj, inputId) {
    let member = null;
    Object.keys(memberObj).forEach((key) => {
      if (key === inputId) {
        member = memberObj[key];
      }
    })
    return member;
  },

  
  async isValidPassword(member, inputPassword) {
    const isValidPass = await cryptoPassword.checkPass(member.password, inputPassword, member.salt);
    return isValidPass;
  },

}

module.exports = loginController;