const fs = require('fs');

const readFile = (path, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

const writeFile = (path, data, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, encoding, (err) => {
      if (err) reject(err);
      resolve();
      console.log(`save : ${data}`)
    })
  })
}

const appendFile = (path, data, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, encoding, (err) => {
      if (err) reject(err);
      resolve();
      console.log(`save : ${data}`)
    })
  })
};

const getRawDataArr = async (path) => {
  const rawdata = await readFile(path);
  const dataArr = rawdata.split('\r\n');
  const [dataKeyString, ...dataValueArr] = dataArr;
  const dataKeyArr = dataKeyString.split(',');
  
  return {
    dataKeyArr,
    dataValueArr
  }
}

const getKeyObj = ({dataKeyArr, dataValueArr}) => {
  return dataValueArr.reduce((acc, dataSet) => {
    const obj = {};
    const dataSetArr = dataSet.split(',');
  
    dataKeyArr.forEach((key, index) => {
        acc[key] = dataSetArr[index];
    });
    return acc;
  },{});
}

const getDataObj = ({dataKeyArr, dataValueArr}) => {
  return dataValueArr.reduce((acc, dataSet) => {
    const obj = {};
    const dataSetArr = dataSet.split(',');
    const [primaryKey, ...memberValueArr] = dataSetArr;
  
    dataKeyArr.forEach((key, index) => {
      if (index !== 0) {
        obj[key] = memberValueArr[index-1];
      }
    });
    acc[primaryKey] = obj;
    return acc;
  },{});
}

const getMemberObj = ({dataKeyArr, dataValueArr}) => {
  return dataValueArr.reduce((acc, dataset) => {
    const obj = {};
    const dataSetArr = dataset.split(',');
    const [primaryKey, name, id, password, salt] = dataSetArr;

    dataKeyArr.forEach((key, index) => {
      if (index !== 2) {
        obj[key] = dataSetArr[index];
      }
    });

    acc[id] = obj;
    return acc;
  },{});
}

const readCsvData = async (path, dataFunc) => {
  try {
    const rawDataArr = await getRawDataArr(path);
    const dataObj = dataFunc(rawDataArr);

    return dataObj;
  } catch (error) {
    console.error('데이터 읽기 오류');
  }
};

const appendCsvData = async (path, data) => {
  try {
    await appendFile(path, data);
  } catch (error) {
    console.error('데이터 쓰기 오류')
  }
}

const overwriteCsvData = async (path, data) => {
  try {
    await writeFile(path, data);
  } catch (error) {
    console.error('데이터 쓰기 오류')
  }
}

// 이 방법밖에 없는거니? 비효율적이야
const objDataToCsv = (objData) => {
  let dataStr = ``;
  Object.keys(objData).forEach((key, index) => {
    if (index+1 === Object.keys(objData).length) {
      dataStr+=`${key}`
      return;
    }
    dataStr+=`${key},`
  })

  dataStr+=`\r\n`;

  Object.keys(objData).forEach((key, index) => {
    if (index+1 === Object.keys(objData).length) {
      dataStr+=`${objData[key]}`;
      return;
    }
    dataStr+=`${objData[key]},`;
  })
  return dataStr;
}

module.exports = {
  getKeyObj,
  getDataObj,
  getMemberObj,
  overwriteCsvData,
  readCsvData,
  appendCsvData,
  objDataToCsv
};