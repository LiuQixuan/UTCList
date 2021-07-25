/*
 * ------------------------------------
 * File: d:\My Documents\Documents\GitHub\UTCList\src\build-windowsTimezoneStyle
 * Project: d:\My Documents\Documents\GitHub\UTCList
 * Created Date: 2021-07-25  6:59:08
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-07-25  6:59:08
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

function logger (infoStr, callerName, loggerType) {
  const date = new Date()
  console.log(`[${loggerType || 'info'}][Function:${callerName || 'Anonymous'}][${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]:${infoStr || ""}`)
}

function writeFiles (data, fileName = `data-${Math.random() * 1000}.json`) {
  return fs.promises.open(fileName, 'w').then(fileHandle => fileHandle.write(data))
}

function readFile (filePaths, callback) {
console.log(filePaths)
  let fRead = fs.createReadStream(filePaths[0])
  let objReadline = readLine.createInterface({
    input: fRead
  })
  let arr = new Array()
  objReadline.on('line', function (line) {
    if (line !== "") {
      const dataArr = line.split('|')
      let utcOffset = dataArr[0].replace(/^UTC\s*/, "")
      arr.push({
        abbr: dataArr[2].startsWith('UTC') ? dataArr[2] : dataArr[2].split(' ').map(str => /^\w/.test(str)?str[0]:"").join(''),
        timeZoneName: dataArr[2],
        timeZoneCName:"",
        locationName: dataArr[1],
        locationCName:"",
        UTCOffset: utcOffset,
      })
    }
  })
  objReadline.on('close', function () {
    arr[0].abbr = arr[0].abbr.trimLeft()
    fRead = fs.createReadStream(filePaths[1])
    objReadline = readLine.createInterface({
      input: fRead
    })
    let index = 0
    objReadline.on('line', function (line) {
      if (line !== "") {
        const dataArr = line.split('|')
        arr[index].locationCName = dataArr[1]
        if(dataArr[2]!==arr[index].timeZoneName){console.log(index+1)}
        index++;
      }
    })
    objReadline.on('close', function () {
      fRead = fs.createReadStream(filePaths[filePaths.length-1])
      objReadline = readLine.createInterface({
        input: fRead
      })
      let index = 0
      objReadline.on('line', function (line) {
        if (line !== "") {
          arr[index].timeZoneCName = line.trim()
          index++
        }
      })
      objReadline.on('close', function () {
        callback(arr).then(() => { logger("build UTCList success!", 'build') }).catch(e => logger(e, 'build', 'Error'))
      })
    })
  })
  return arr
}


function cleanFiles (dirPath,fileList) {
  return fs.promises.readdir(dirPath).then((files) => {
    files.forEach(file => {
      if (fileList.includes(file)){
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

function readFileCallBack (fileName,data) {
  const strArr = ['const data = ', os.EOL + 'module.exports = data' + os.EOL]
  return Promise.all([
    writeFiles(strArr.join(JSON.stringify(data)), path.join(__dirname, `../dist/${fileName}.min.js`)),
    writeFiles(jsBeautify(strArr.join(JSON.stringify(data)), { indent_size: 4 }), path.join(__dirname, `../dist/${fileName}.js`)),
  ])
}

function build (flag) {
  // const testDataFilePath = path.join(__dirname, "../data", "UTC-test.csv")
  // let FilePath = flag === "test" ? testDataFilePath : dataFilePath
  readFile(FilePaths, readFileCallBack.bind(null, 'index_windowsUTC'))
  // await cleanDir(path.join(__dirname, "../dist")).then(() => console.log('clean'))
}

const normalUTCFiles = ['index_windowsUTC.js','index_windowsUTC.min.js']
const dictFiles = ['index.js','index.min.js']
const dataFilePath_en_US = path.join(__dirname, "../data", "utc-list_windows-en.txt")
const dataFilePath_zh_CN = path.join(__dirname, "../data", "utc-list_windows-cn.txt")
const dataFilePath_timezone_CName = path.join(__dirname, "../data", "utc-list_windows-timezoneCName.txt")
const FilePaths = [dataFilePath_en_US, dataFilePath_zh_CN, dataFilePath_timezone_CName]//first en file,second cn file.

cleanFiles(path.join(__dirname, "../dist"), normalUTCFiles).then(() => {
  logger("Files will be processed...", 'clean')
  // normalUTCFiles.forEach((fileName,index)=>{
  //   fs.copyFile(path.join(__dirname, "../dist", fileName), path.join(__dirname, "../dist", dictFiles[index]))
  // })
  build()
})