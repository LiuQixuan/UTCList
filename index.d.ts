/**
 * ------------------------------------
 * File: d:\My Documents\Documents\GitHub\UTC\index.d.ts
 * Project: d:\My Documents\Documents\GitHub\UTC
 * Created Date: 2021-06-29  10:19:39
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-07-26  12:00:49
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */

declare const UTCList: [{abbr: string, timeZoneName: string , timeZoneCName: string, location: string, UTCOffset: string }];
declare const UTCListRaw: [{abbr: string, timeZoneName: string, timeZoneCName: string, location: string, UTCOffset: string }];
declare const windowsUTC: [{ abbr: string, timeZoneName: string, timeZoneCName: string, locationName: string, locationCName: string, UTCOffset: string }];
declare const windowsUTCRaw: [{ abbr: string, timeZoneName: string, timeZoneCName: string, locationName: string, locationCName: string, UTCOffset: string }];
export { UTCList, UTCListRaw, windowsUTC, windowsUTCRaw};
