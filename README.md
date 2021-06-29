# UTCList/UTC 数据集

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

## Usage/用法

数据定义:
```Typescript
interface UTCListItem {
  abbr: string //UTC时区缩写(UTC time zone )
  timeZoneName: string //时区名称 (time zone name)
  cityNtimeZoneCName: string //时区中文名称 (time zone Chines name)
  location: string //使用该时区的区域( the area in which the time zone is used)
  UTCOffset: number  //UTC 偏移量(UTC offset)
}
```


引入包,并添加到基本类型的原型中
```JavaScript

//ES6 Module
import {UTCList,UTCListRaw} form "UTCList"

//CommonJs Module
const UTCList = reqriue("UTCList")
UTCList.UTCListT
UTCList.UTCListRaw

//CommonJs Module
const UTCList = reqriue("UTCList").UTCList
const UTCListRaw = reqriue("UTCList").UTCListRaw
```

## Test/测试

基本格式化输出测试
```javascript
console.log(UTCList[0].abbr,UTCList[0].timeZoneName,UTCList[0].cityNtimeZoneCName,UTCList[0].location,UTCList[0].UTCOffset)
```

## Notice/注意

由于UTC 代码有重复值,故为了保险起见,此数据集不应当用作检索,仅用于遍历展示.
## Advance/优势

数据比较全,中英文时区描述
## Version/版本日志

-  ✅v0.0.1 发布UTCList包.
-  🟩v0.0.X 修复潜在BUG