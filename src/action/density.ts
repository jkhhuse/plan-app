import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action";
import { PLAN_SERVER } from "@/constants/common";
import { retryBackoff } from "backoff-rxjs";
import { handleError } from "@/action/common/handle";
import { DensityList } from "@/types/density";

/**
 * 获得血值的列表
 * @returns HttpMessage<Profile>
 */
export const getAllDensityListAction = (): Observable<HttpMessage<DensityList>> => {
  const url = PLAN_SERVER + "density/dimension/all";
  return http.get<HttpMessage<DensityList>>(url).pipe(
    retryBackoff({
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};

/**
 * 增加一次血值记录
 * @param measureTime 采集时间
 * @param measureValue 采集数值
 * @returns
 */
export const addDensityAction = (
  measureTime: string,
  measureValue: number,
): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + "density/add";
  return http
    .post<HttpMessage<string>>(url, {
      measureTime: measureTime,
      measureValue: measureValue,
    })
    .pipe(
      retryBackoff({
        maxRetries: 0,
        initialInterval: 4000,
      }),
      catchError(handleError),
    );
};

/**
 * 删除血值记录
 * @param densityUuid uuid
 * @returns string
 */
export const removeDensityAction = (densityUuid: string): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + "density/delete/" + densityUuid;
  return http.delete<HttpMessage<string>>(url).pipe(
    retryBackoff({
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};

/**
 * 不允许有重复血值记录
 * @param densityTime 采血时间
 * @returns string
 */
export const isDuplicateDensityAction = (densityTime: string): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + "density/duplicate/" + densityTime;
  return http.get<HttpMessage<string>>(url).pipe(
    retryBackoff({
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};

/**
 * 更新血值记录
 * @param densityUuid 采血时间
 * @param measureTime 采集时间
 * @param measureValue 采集数值
 * @returns string
 */
export const updateDensityAction = (
  densityUuid: string,
  measureTime: string,
  measureValue: number,
): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + "density/update/" + densityUuid;
  return http
    .put<HttpMessage<string>>(url, {
      measureTime: measureTime,
      measureValue: measureValue,
    })
    .pipe(
      retryBackoff({
        initialInterval: 4000,
      }),
      catchError(handleError),
    );
};

/**
 * 根据时间段获得血值记录
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @returns List
 */
export const getDensityRangeAction = (
  startTime: string,
  endTime: string,
): Observable<HttpMessage<string>> => {
  const url = PLAN_SERVER + "density/dimension";
  return http
    .post<HttpMessage<string>>(url, {
      startTime: startTime,
      endTime: startTime,
    })
    .pipe(
      retryBackoff({
        initialInterval: 4000,
      }),
      catchError(handleError),
    );
};
