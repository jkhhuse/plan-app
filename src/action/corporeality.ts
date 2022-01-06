import { HttpMessage } from "@/types/index";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { http } from "@/action";
import { PLAN_SERVER } from "@/constants/common";
import { retryBackoff } from "backoff-rxjs";
import { handleError } from "@/action/common/handle";

/**
 * 获得最近一次体重记录
 * @returns
 */
export const getLatestWeightAction = (): Observable<HttpMessage<number>> => {
  const url = PLAN_SERVER + "corporeality/weight/latest";
  return http.get<HttpMessage<number>>(url).pipe(
    retryBackoff({
      maxRetries: 1,
      initialInterval: 4000,
    }),
    catchError(handleError),
  );
};
