import dayjs from "dayjs";

/**
 * 转换为 yyyy-MM-dd 时间格式
 * @param date Date
 * @returns yyyy-MM-dd
 */
const formatDate = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD").toString();
};

/**
 * 转换为 yyyy-MM-dd hh:mm 时间格式
 * @param date Date
 * @returns yyyy-MM-dd hh:mm
 */
const formatDateTime = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD HH:mm").toString();
};

/**
 * 转换为 yyyy-MM-dd hh:mm 时间格式
 * @param date yyyy-MM-dd hh:mm:ss
 * @returns yyyy-MM-dd hh:mm
 */
const formatExcludeMinute = (dateTime: string): string => {
  const time = dayjs(dateTime).format("YYYY-MM-DD HH:mm").toString();
  return time;
};

/**
 * 添加分钟与秒
 * @param date yyyy-MM-dd
 * @param time hh:mm
 * @returns yyyy-MM-dd hh:mm
 */
const addMinAndSecToTime = (date: string): string => {
  const minAndSec = dayjs(new Date()).format(" HH:mm");
  return date + minAndSec;
};

/**
 * 把 date + time 进行组合
 * @param date yyyy-MM-dd
 * @param time hh:mm
 * @returns yyyy-MM-dd hh:mm
 */
const combineTime = (date: string, time: string): string => {
  return date.split(" ")[0] + " " + time;
};

export { formatDate, formatDateTime, combineTime, addMinAndSecToTime, formatExcludeMinute };
