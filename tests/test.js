/**
 * ------------------------------------
 * File: d:\My Documents\Documents\GitHub\UTCList\test\test.js
 * Project: d:\My Documents\Documents\GitHub\UTCList
 * Created Date: 2021-07-26  12:20:17
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-07-26  5:01:04
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */

var windowsUTC = require('../index').windowsUTC
var UTCList =  require('../index').UTCList
describe('UTCList test:', () => {
  it('windowsUTC test:',()=>{
    expect(windowsUTC[0]).toStrictEqual({
      abbr: 'DST',
      timeZoneName: 'Dateline Standard Time',
      timeZoneCName: '日期变更线标准时间',
      locationName: 'International Date Line West',
      locationCName: '国际日期变更线西',
      UTCOffset: '-12:00'
    })
  })
  it('UTCList test:', () => {
    expect(UTCList[0]).toStrictEqual({
      abbr: 'ACDT',
      timeZoneName: 'Australian Central Daylight Time',
      timeZoneCName: '澳大利亚中部夏令时间',
      locationName: 'Australia',
      locationCName: '澳大利亚',
      UTCOffset: '+10:30'
    })
  })
});

