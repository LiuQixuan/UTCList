/**
 * ------------------------------------
 * File: d:\My Documents\Documents\GitHub\UTC\src\build.js
 * Project: d:\My Documents\Documents\GitHub\UTC
 * Created Date: 2021-06-29  6:45:46
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-07-26  2:38:08
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */

const fs = require("fs")
const path = require("path")
const os = require('os')
const readLine = require("readline")
const jsBeautify = require('js-beautify')


function writeFiles (data, fileName = `data-${Math.random() * 1000}.json`) {
  return fs.promises.open(fileName, 'w').then(fileHandle => fileHandle.write(data))
}


function cleanFiles (dirPath, fileList) {
  return fs.promises.readdir(dirPath).then((files) => {
    files.forEach(file => {
      if (fileList.includes(file)) {
        let filePath = path.join(dirPath, file)
        if (fs.statSync(filePath).isDirectory()) {
          fs.readdirSync(filePath, { maxRetries: 3, recursive: true, retryDelay: 500 })
        } else {
          fs.rmSync(filePath, { maxRetries: 3, recursive: true, retryDelay: 500 })
        }
      }
    })
  }).then(() => logger(`clear dir '${dirPath}' complete.`, 'cleanDir')).catch(e => { logger(e, 'cleanDir', 'error'); throw e })
}

function readFile (filePath,callback){
  let fRead = fs.createReadStream(filePath)
  let objReadline = readLine.createInterface({
    input: fRead
  })
  let arr = new Array()
  objReadline.on('line', function (line) {
    const dataArr = line.split(',')
    let utcOffset = dataArr[5].replace(/^UTC\s+/, "")
    if(!utcOffset.includes(':')){
      utcOffset = utcOffset.concat(":00")
    }
    arr.push({
      abbr: dataArr[0],
      timeZoneName: dataArr[1],
      timeZoneCName: dataArr[2],
      locationName:dataArr[3],
      locationCName:dataArr[4],
      UTCOffset: utcOffset,
    })
  })
  objReadline.on('close', function () {
    arr[0].abbr = arr[0].abbr.trimLeft()
    callback(arr).then(() => { logger("build UTCList(normal) success!", 'build') }).catch(e => logger(e, 'build', 'Error'))
  })
  return arr
}

function logger (infoStr, callerName, loggerType) {
  const date = new Date()
  console.log(`[${loggerType || 'info'}][Function:${callerName || 'Anonymous'}][${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]:${infoStr || ""}`)
}

function readFileCallBack (fileName,data){
  const strArr = ['const data = ', os.EOL + 'module.exports = data' + os.EOL]
  return Promise.all([
    writeFiles(strArr.join(JSON.stringify(data)), path.join(__dirname, `../dist/${fileName}.min.js`)),
    writeFiles(jsBeautify(strArr.join(JSON.stringify(data)), { indent_size: 4 }), path.join(__dirname, `../dist/${fileName}.js`)),
  ])
}

async function build (outputFileName = 'index_normal', flag = 'prod') {
  const dataFilePath = path.join(__dirname, "../data", "UTC.csv")
  const testDataFilePath = path.join(__dirname, "../data", "UTC-test.csv")
  let FilePath = flag === "test" ? testDataFilePath : dataFilePath
  readFile(FilePath,readFileCallBack.bind(null,outputFileName))
}

// build("test")
const dictFiles = ['index_normal.js', 'index_normal.min.js']

cleanFiles(path.join(__dirname, "../dist"), dictFiles).then(() => {
  logger("Files will be processed...", 'clean')
  build()
})
