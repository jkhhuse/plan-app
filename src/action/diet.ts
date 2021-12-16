import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action";
import { PLAN_SERVER } from "@/constants/common";
import { retryBackoff } from "backoff-rxjs";
import { handleError } from "@/action/common/handle";
import { Diet } from "@/types/diet";

/**
 * 添加饮食记录
 * @param diet Diet
 * @returns HttpMessage<string>
 */
export const addDietAction = (diet: Diet): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + "diet/add";
  return http.post<HttpMessage<string>>(url, diet).pipe(
    retryBackoff({
      maxRetries: 0,
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};

/**
 * 删除饮食记录
 * @param dietId id
 * @returns HttpMessage<string>
 */
export const deleteDietAction = (dietId: string): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + `diet/delete/${dietId}`;
  return http.delete<HttpMessage<string>>(url).pipe(
    retryBackoff({
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};

/**
 * 查询指定日期的全部饮食信息
 * @param date 指定日期
 * @returns
 */
export const findDietByDateAction = (date: string): Observable<HttpMessage<Diet[]>> => {
  const url = PLAN_SERVER + `diet/list/${date}`;
  return http.get<HttpMessage<Diet[]>>(url).pipe(
    retryBackoff({
      maxRetries: 0,
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};

/**
 * 修改饮食记录
 * @param dietId 饮食记录ID
 * @param diet Diet
 * @returns
 */
export const updateDietAction = (dietId: string, diet: Diet): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + `diet/update/${dietId}`;
  return http.put<HttpMessage<string>>(url, diet).pipe(
    retryBackoff({
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};

/**
 * 通过 dietId 获得数据信息
 * @param dietId uuid
 * @returns Diet
 */
export const getDietAction = (dietId: string): Observable<HttpMessage<Diet>> => {
  const url = PLAN_SERVER + `diet/findDiet/${dietId}`;
  return http.get<HttpMessage<Diet>>(url).pipe(
    retryBackoff({
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};
