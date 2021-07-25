# UTCList/UTC 数据集

[TOC]

## Introduce/简介

用于展示数据的UTC数据集,包含全世界 时区缩写 所属地区 夏令时 和 标准时.

UTC codes and abbreviations for Standard Time and Daylight Saving Time (DST) around the world.



## Feature/特性:

1. 全世界范围现行的全部时区数据
2. 包含时区缩写
3. 包含所属地区
4. 包含夏令时
5. 包含标准时
6. 中英文时区描述
7. windows 11操作系统时区数据
## Usage/用法

数据定义:
```Typescript
interface UTCListItem {
  abbr: string //UTC时区缩写(UTC time zone )
  timeZoneName: string //时区名称 (time zone name)
  timeZoneCName: string //时区中文名称 (time zone Chines name)
  locationName: string //使用该时区的区域的英文名称( the area'  english name in which the time zone is used)
  locationCName: string //使用该时区的区域的中文名称( the area' chinese name in which the time zone is used)
  UTCOffset: number  //UTC 偏移量(UTC offset)
}
```


引入包,并添加到基本类型的原型中
```JavaScript
// UTCList,UTCListRaw
// UTCList,UTCListRaw的区别: UTCList是压缩后的数据,UTCListRaw是未压缩数据,便于查看.
// The difference between UTCList and UTCListRaw: UTCList is compressed data, and UTCListRaw is uncompressed data, which is easy to view.

//ES6 Module
import {UTCList,UTCListRaw} form "UTCList"

//CommonJs Module
const UTCList = reqriue("UTCList")
var UTCList = UTCList.UTCList
var UTCListRaw = UTCList.UTCListRaw

//CommonJs Module
const UTCList = reqriue("UTCList").UTCList
const UTCListRaw = reqriue("UTCList").UTCListRaw
```

```JavaScript

//ES6 Module
import {windowsUTC} form "UTCList"

//CommonJs Module
const UTCList = reqriue("UTCList")
var windowsUTC = UTCList.windowsUTC
var windowsUTCRaw = UTCList.windowsUTCRaw

//CommonJs Module
const windowsUTC = reqriue("UTCList").windowsUTC
const windowsUTCRaw = reqriue("UTCList").windowsUTCRaw
```

## Test/测试

基本输出测试
```javascript
console.log(UTCList[0].abbr,UTCList[0].timeZoneName,UTCList[0].timeZoneCName,UTCList[0].location,UTCList[0].UTCOffset)
```
## Build/构建

|构建命令|功能|
|:--: |---- |
|`build_normal`| 构建UTCList normal ,默认 TimeZone 格式,以时区划分,数据全面. |
|`build_windowsStyle`| 构建windows 操作系统内部自带的时区选择工具所使用的时区数据,按照UTC偏移值排序,以世界著名城市划分,数据不全,但是实用. |
|`build_all`| 顾名思义,同时重构所以支持的时区数据. |

## Notice/注意

由于UTC 代码有重复值,故为了保险起见,此数据集不应当用作检索,仅用于遍历展示.
## Advance/优势

数据比较全,中英文时区描述.
提供windows11 最新的时区数据.支持常用城市检索.
## Version/版本日志

-  ✅v1.0.0 发布UTCList包.
-  ✅v1.0.1 修复部分错误.
-  ✅v1.0.2 修复部分错误.
-  ✅v1.0.3 修复由于csv格式导致的错误.
-  ✅v1.0.4 新增windows 11操作系统时区数据.
-  🟩v1.0.X 修复潜在BUG