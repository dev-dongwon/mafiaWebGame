const requestObj = {
  
  makeQueryObj(queries) {
    return queries.reduce((acc, data) => {
      const keyValueArr = data.split('=');
      acc[keyValueArr[0]] = keyValueArr[1];
      return acc;
    },{});
  },

  getPath(fullUrlArr) {
    const path = fullUrlArr[0] || '/';
    return path;
  },
  
  request(req){
    if (!req) throw Error('request is required')
    const fullUrlArr = req.url.split('?');
    req.path = req.path || requestObj.getPath(req);

    if (fullUrlArr.length === 1) return req;
  
    const queries = fullUrlArr[1].split('&');
    const queryObj = requestObj.makeQueryObj(queries);
    req.query = queryObj;

    return req;
  },
}

module.exports = requestObj.request;