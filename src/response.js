const response = (res) => {
  if (!res) console.error('response is requierd');

  res.status = res.status || ((status) => {
    res.status = status;
    return res;
  })

  res.set = res.set || ((key, value) => {
    res.setHeader(key, value);
    return res;
  })

  res.send = res.send || ((data) => {
    if (!res.getHeader('Content-Type')) {
      res.setHeader('Content-Type', 'text/plain');
    }
    res.write(data);
    res.end();
  })

  res.json = res.json || ((data) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  })

  return res;
}

module.exports = response;