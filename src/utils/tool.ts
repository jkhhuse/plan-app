/**
 * 转换为 yyyy-MM-dd 时间格式
 * @param date Date
 * @returns yyyy-MM-dd
 */
const formatDate = (date: Date): string => {
  const month = +date.getMonth() + 1;
  return date.getFullYear() + "-" + month + "-" + date.getDate();
};

/**
 * 转换为 yyyy-MM-dd hh:mm 时间格式
 * @param date Date
 * @returns yyyy-MM-dd hh:mm
 */
const formatDateTime = (date: Date): string => {
  const month = +date.getMonth() + 1;
  return (
    date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes
  );
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

export { formatDate, formatDateTime, combineTime };
