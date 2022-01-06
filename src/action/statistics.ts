import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action";
import { PLAN_SERVER } from "@/constants/common";
import { retryBackoff } from "backoff-rxjs";
import { handleError } from "@/action/common/handle";
import { Statisitcs } from "@/types/statistics";

/**
 * 搜索最近 N 天的数据
 * @param measureTime 测量时间
 * @returns
 */
export const searchLatestDietAction = (
  measureTime: string,
  days: string,
): Observable<HttpMessage<Statisitcs>> => {
  const url = PLAN_SERVER + "stats/latest/";
  const payload = {
    days: days,
    measureTime: measureTime,
  };
  return http.post<HttpMessage<Statisitcs>>(url, payload).pipe(
    retryBackoff({
      maxRetries: 1,
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};
